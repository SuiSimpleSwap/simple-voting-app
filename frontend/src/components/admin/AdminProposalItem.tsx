import { useSuiClientQuery, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { FC, useState } from "react";
import { SuiObjectData } from "@mysten/sui/client";
import { Proposal, VoteNft } from "../../types";
import { useNetworkVariable } from "../../config/networkConfig";
import { Transaction } from "@mysten/sui/transactions";
import { toast } from "react-toastify";

interface AdminProposalItemProps {
  id: string;
  voteNft: VoteNft | undefined;
  onAction: () => void;
}

export const AdminProposalItem: FC<AdminProposalItemProps> = ({ id, voteNft, onAction }) => {
  const [actionPending, setActionPending] = useState(false);
  const packageId = useNetworkVariable("packageId");
  const adminCapId = useNetworkVariable("adminCapId");
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const { data: dataResponse, error, isPending } = useSuiClientQuery(
    "getObject", {
      id,
      options: {
        showContent: true
      }
    }
  );

  if (isPending) return (
    <div className="bg-white border-4 border-black p-6 min-h-[200px] flex items-center justify-center shadow-brutal">
      <p className="font-mono font-bold uppercase tracking-wider">LOADING...</p>
    </div>
  );

  if (error) return (
    <div className="bg-black text-white border-4 border-black p-6 min-h-[200px] flex items-center justify-center shadow-brutal">
      <p className="font-mono font-bold uppercase tracking-wider">ERROR: {error.message}</p>
    </div>
  );

  if (!dataResponse.data) return null;

  const proposal = parseProposal(dataResponse.data as any);
  if (!proposal) return null;

  const expiration = proposal.expiration;
  const isDelisted = proposal.status.variant === "Delisted";
  const isExpired = isUnixTimeExpired(expiration);
  const isActive = proposal.status.variant === "Active" && !isExpired;

  const handleStatusChange = (action: "activate" | "delist") => {
    setActionPending(true);
    
    const tx = new Transaction();
    const functionName = action === "activate" ? "set_active_status" : "set_delisted_status";
    
    tx.moveCall({
      arguments: [
        tx.object(proposal.id.id),
        tx.object(adminCapId)
      ],
      target: `${packageId}::proposal::${functionName}`
    });

    signAndExecute({
      transaction: tx
    }, {
      onError: (error) => {
        console.error("Transaction failed:", error);
        toast.error(`Failed to ${action} proposal`);
        setActionPending(false);
      },
      onSuccess: () => {
        toast.success(`Proposal ${action}d successfully!`);
        onAction();
        setActionPending(false);
      }
    });
  };

  const handleRemoveProposal = () => {
    if (!confirm("Are you sure you want to permanently delete this proposal? This action cannot be undone.")) {
      return;
    }

    setActionPending(true);
    
    const tx = new Transaction();
    tx.moveCall({
      arguments: [
        tx.object(proposal.id.id),
        tx.object(adminCapId)
      ],
      target: `${packageId}::proposal::remove`
    });

    signAndExecute({
      transaction: tx
    }, {
      onError: (error) => {
        console.error("Remove failed:", error);
        toast.error("Failed to remove proposal");
        setActionPending(false);
      },
      onSuccess: () => {
        toast.success("Proposal removed successfully!");
        onAction();
        setActionPending(false);
      }
    });
  };

  return (
    <div className="bg-white border-4 border-black p-6 shadow-brutal">
      {/* Header with Status */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold font-mono uppercase tracking-wider break-words flex-1 mr-2">
          {proposal.title}
        </h3>
        <div className="flex-shrink-0">
          {isDelisted ? (
            <span className="bg-black text-white border-2 border-black px-2 py-1 text-xs font-mono font-bold uppercase tracking-wider">
              DELISTED
            </span>
          ) : isExpired ? (
            <span className="bg-gray-500 text-white border-2 border-gray-500 px-2 py-1 text-xs font-mono font-bold uppercase tracking-wider">
              EXPIRED
            </span>
          ) : (
            <span className="bg-green-500 text-white border-2 border-green-500 px-2 py-1 text-xs font-mono font-bold uppercase tracking-wider">
              ACTIVE
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="font-mono text-sm mb-4 break-words text-gray-700">
        {proposal.description}
      </p>

      {/* Vote Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center font-mono font-bold">
          <span className="mr-2 text-lg">👍</span>
          <span className="bg-white border-2 border-black px-2 py-1 text-sm">
            {proposal.votedYesCount}
          </span>
        </div>
        <div className="flex items-center font-mono font-bold">
          <span className="mr-2 text-lg">👎</span>
          <span className="bg-black text-white border-2 border-black px-2 py-1 text-sm">
            {proposal.votedNoCount}
          </span>
        </div>
      </div>

      {/* Metadata */}
      <div className="mb-4 p-3 bg-gray-50 border-2 border-gray-300">
        <div className="grid grid-cols-1 gap-2 text-xs font-mono">
          <div>
            <span className="font-bold uppercase tracking-wider text-gray-600">Creator:</span>
            <span className="ml-2 break-all">{proposal.creator.slice(0, 8)}...{proposal.creator.slice(-6)}</span>
          </div>
          <div>
            <span className="font-bold uppercase tracking-wider text-gray-600">Expires:</span>
            <span className="ml-2">{formatUnixTime(expiration)}</span>
          </div>
          <div>
            <span className="font-bold uppercase tracking-wider text-gray-600">ID:</span>
            <span className="ml-2 break-all">{proposal.id.id.slice(0, 8)}...{proposal.id.id.slice(-6)}</span>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {!isDelisted && isActive && (
          <button
            onClick={() => handleStatusChange("delist")}
            disabled={actionPending}
            className="bg-red-500 text-white border-4 border-red-500 font-mono font-bold uppercase tracking-wider px-3 py-2 text-xs hover:bg-white hover:text-red-500 transition-all duration-150 disabled:opacity-50 shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            {actionPending ? "..." : "DELIST"}
          </button>
        )}
        
        {isDelisted && (
          <button
            onClick={() => handleStatusChange("activate")}
            disabled={actionPending}
            className="bg-green-500 text-white border-4 border-green-500 font-mono font-bold uppercase tracking-wider px-3 py-2 text-xs hover:bg-white hover:text-green-500 transition-all duration-150 disabled:opacity-50 shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            {actionPending ? "..." : "ACTIVATE"}
          </button>
        )}

        <button
          onClick={handleRemoveProposal}
          disabled={actionPending}
          className="bg-black text-white border-4 border-black font-mono font-bold uppercase tracking-wider px-3 py-2 text-xs hover:bg-white hover:text-black transition-all duration-150 disabled:opacity-50 shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          {actionPending ? "..." : "DELETE"}
        </button>

        <button
          disabled={true}
          className="bg-gray-300 text-gray-600 border-4 border-gray-300 font-mono font-bold uppercase tracking-wider px-3 py-2 text-xs cursor-not-allowed"
        >
          ANALYTICS
        </button>
      </div>

      {voteNft && (
        <div className="mt-4 flex justify-center">
          <span className="bg-blue-500 text-white border-2 border-blue-500 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider">
            ADMIN VOTED
          </span>
        </div>
      )}
    </div>
  );
};

function parseProposal(data: SuiObjectData): Proposal | null {
  if (data.content?.dataType !== "moveObject") return null;

  const { voted_yes_count, voted_no_count, expiration, ...rest } = data.content.fields as any;

  return {
    ...rest,
    votedYesCount: Number(voted_yes_count),
    votedNoCount: Number(voted_no_count),
    expiration: Number(expiration)
  };
}

function isUnixTimeExpired(unixTimeMs: number) {
  return new Date(unixTimeMs) < new Date();
}

function formatUnixTime(unixTimeMs: number) {
  return new Date(unixTimeMs).toLocaleString();
}

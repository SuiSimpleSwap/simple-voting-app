import { FC, useRef } from "react";
import { Proposal } from "../../types";
import { ConnectButton, useCurrentWallet, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../../config/networkConfig";
import { Transaction } from "@mysten/sui/transactions";
import { toast } from "react-toastify";

interface VoteModalProps {
  proposal: Proposal;
  hasVoted: boolean;
  isOpen: boolean;
  onClose: () => void;
  onVote: (votedYes: boolean) => void;
};

export const VoteModal: FC<VoteModalProps> = ({
  proposal,
  hasVoted,
  isOpen,
  onClose,
  onVote,
}) => {
  const { connectionStatus } = useCurrentWallet();
  const suiClient = useSuiClient();
  const { mutate: signAndExecute, isPending, isSuccess, reset } = useSignAndExecuteTransaction();
  const packageId = useNetworkVariable("packageId");
  const toastId = useRef<number | string>();

  if (!isOpen) return null;

  const showToast = (message: string) => toastId.current = toast(message, {autoClose: false});

  const dismissToast = (message: string) => {
    toast.dismiss(toastId.current);
    toast(message, { autoClose: 2000 });
  };

  const vote = (voteYes: boolean) => {

    const tx = new Transaction();
    tx.moveCall({
      arguments: [
        tx.object(proposal.id.id),
        tx.pure.bool(voteYes),
        tx.object("0x6")
      ],
      target: `${packageId}::proposal::vote`
    });

    showToast("PROCESSING TRANSACTION");
    signAndExecute({
      transaction: tx
    }, {
      onError: () => {
        dismissToast("TX FAILED!");
      },
      onSuccess: async ({ digest }) => {
        await suiClient.waitForTransaction({
          digest,
          options: {
            showEffects: true
          }
        });

        const eventResult = await suiClient.queryEvents({
          query: { Transaction: digest }
        });

        if (eventResult.data.length > 0) {
          const firstEvent = eventResult.data[0].parsedJson as {proposal_id?: string, voter?: string, vote_yes?: boolean };
          const id = firstEvent.proposal_id || "No event found for give criteria";
          const voter = firstEvent.voter || "No event found for give criteria";
          const voteYes = firstEvent.vote_yes || "No event found for give criteria";
          console.log("Event Captured!");
          console.log(id, voter, voteYes);
        } else {
          console.log("No events found!");
        }

        reset();
        dismissToast("TX SUCCESSFUL!");
        onVote(voteYes);
      }
    });
  }

  const votingDisable = hasVoted || isPending || isSuccess;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black max-w-md w-full shadow-brutal-xl">
        
        {/* Header */}
        <div className="bg-black text-white p-4 border-b-4 border-black">
          <div className="flex items-start justify-between">
            <h2 className="text-xl sm:text-2xl font-bold font-mono uppercase tracking-wider break-words flex-1 mr-4">
              {proposal.title}
            </h2>
            {hasVoted || isSuccess ? (
              <div className="bg-white text-black border-2 border-white px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider flex-shrink-0">
                VOTED
              </div>
            ) : (
              <div className="bg-white text-black border-2 border-white px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider flex-shrink-0">
                NOT VOTED
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="font-mono text-sm sm:text-base mb-6 break-words">
            {proposal.description}
          </p>
          
          {/* Vote Stats */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center font-mono font-bold">
              <span className="mr-2 text-lg">👍</span>
              <span className="bg-white border-2 border-black px-3 py-2 text-sm uppercase tracking-wider">
                YES: {proposal.votedYesCount}
              </span>
            </div>
            <div className="flex items-center font-mono font-bold">
              <span className="mr-2 text-lg">👎</span>
              <span className="bg-black text-white border-2 border-black px-3 py-2 text-sm uppercase tracking-wider">
                NO: {proposal.votedNoCount}
              </span>
            </div>
          </div>
          
          {/* Voting Buttons */}
          <div className="flex flex-col gap-4">
            {connectionStatus === "connected" ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  disabled={votingDisable}
                  onClick={() => vote(true)}
                  className="flex-1 bg-white text-black border-4 border-black font-mono font-bold uppercase tracking-wider px-6 py-3 hover:bg-black hover:text-white transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  {isPending ? "VOTING..." : "VOTE YES"}
                </button>
                <button
                  disabled={votingDisable}
                  onClick={() => vote(false)}
                  className="flex-1 bg-black text-white border-4 border-black font-mono font-bold uppercase tracking-wider px-6 py-3 hover:bg-white hover:text-black transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  {isPending ? "VOTING..." : "VOTE NO"}
                </button>
              </div>
            ) : (
              <div className="text-center">
                <ConnectButton 
                  connectText="CONNECT TO VOTE"
                  style={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    border: '4px solid #000000',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '12px 24px',
                    fontSize: '14px'
                  }}
                />
              </div>
            )}
            
            <button
              onClick={onClose}
              className="w-full bg-white text-black border-4 border-black font-mono font-bold uppercase tracking-wider px-6 py-3 hover:bg-black hover:text-white transition-all duration-150 shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

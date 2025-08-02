import { useSuiClientQuery, useCurrentAccount } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../config/networkConfig";
import { PaginatedObjectsResponse, SuiObjectData } from "@mysten/sui/client";
import { VoteNft } from "../types";
import { useVoteNfts } from "../hooks/useVoteNfts";
import { AdminProposalItem } from "../components/admin/AdminProposalItem";
import { AdminStats } from "../components/admin/AdminStats";
import { CreateProposal } from "../components/proposal/CreateProposal";

const AdminView = () => {
  const account = useCurrentAccount();
  const dashboardId = useNetworkVariable("dashboardId");
  const adminCapId = useNetworkVariable("adminCapId");
  const { data: voteNftsRes } = useVoteNfts();

  const {
    data: dataResponse,
    isPending,
    error,
    refetch: refetchDashboard
  } = useSuiClientQuery("getObject", {
    id: dashboardId,
    options: {
      showContent: true,
    },
  });

  // Check if user owns admin cap
  const {
    data: adminCapData,
    isPending: adminCapPending,
    error: adminCapError
  } = useSuiClientQuery("getObject", {
    id: adminCapId,
    options: {
      showOwner: true,
    },
  });

  const isAdmin = adminCapData?.data?.owner && 
    typeof adminCapData.data.owner === "object" && 
    "AddressOwner" in adminCapData.data.owner &&
    adminCapData.data.owner.AddressOwner === account?.address;

  if (adminCapPending || isPending) {
    return (
      <div className="text-center p-8">
        <div className="bg-white border-4 border-black p-8 mx-auto max-w-md">
          <p className="font-mono font-bold text-lg">LOADING ADMIN PANEL...</p>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="text-center p-8">
        <div className="bg-black text-white border-4 border-black p-8 mx-auto max-w-md">
          <h2 className="text-xl font-bold font-mono uppercase tracking-wider mb-4">ADMIN ACCESS</h2>
          <p className="font-mono font-bold">CONNECT WALLET TO ACCESS ADMIN PANEL</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="text-center p-8">
        <div className="bg-black text-white border-4 border-black p-8 mx-auto max-w-md">
          <h2 className="text-xl font-bold font-mono uppercase tracking-wider mb-4">ACCESS DENIED</h2>
          <p className="font-mono font-bold">YOU ARE NOT AN ADMIN</p>
          <p className="font-mono text-sm mt-2">ADMIN CAP REQUIRED</p>
        </div>
      </div>
    );
  }

  if (error || adminCapError) {
    return (
      <div className="text-center p-8">
        <div className="bg-black text-white border-4 border-black p-8 mx-auto max-w-md">
          <p className="font-mono font-bold text-lg">ERROR: {error?.message || adminCapError?.message}</p>
        </div>
      </div>
    );
  }

  if (!dataResponse.data) {
    return (
      <div className="text-center p-8">
        <div className="bg-black text-white border-4 border-black p-8 mx-auto max-w-md">
          <p className="font-mono font-bold text-lg">DASHBOARD NOT FOUND...</p>
        </div>
      </div>
    );
  }

  const voteNfts = extractVoteNfts(voteNftsRes as any);
  const proposals = getDashboardFields(dataResponse.data as any)?.proposals_ids || [];

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono uppercase tracking-wider mb-4 bg-black text-white border-4 border-black p-4 sm:p-6 mx-auto max-w-fit shadow-brutal">
          ADMIN PANEL
        </h1>
        <p className="font-mono text-sm text-gray-600 mt-2">
          TOTAL PROPOSALS: {proposals.length}
        </p>
      </div>

      {/* Admin Statistics */}
      <AdminStats proposals={proposals} voteNfts={voteNfts} />

      {/* Create New Proposal */}
      <div className="mb-8">
        <div className="bg-white border-4 border-black p-6 mx-auto max-w-4xl shadow-brutal">
          <h2 className="text-xl font-bold font-mono uppercase tracking-wider mb-4">CREATE NEW PROPOSAL</h2>
          <CreateProposal />
        </div>
      </div>

      {/* Admin Controls */}
      <div className="mb-8">
        <div className="bg-white border-4 border-black p-6 mx-auto max-w-4xl shadow-brutal">
          <h2 className="text-xl font-bold font-mono uppercase tracking-wider mb-4">ADMIN CONTROLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-black text-white border-4 border-black font-mono font-bold uppercase tracking-wider px-4 py-3 hover:bg-white hover:text-black transition-all duration-150 shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1">
              EXPORT DATA
            </button>
            <button className="bg-black text-white border-4 border-black font-mono font-bold uppercase tracking-wider px-4 py-3 hover:bg-white hover:text-black transition-all duration-150 shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1">
              VIEW LOGS
            </button>
            <button className="bg-black text-white border-4 border-black font-mono font-bold uppercase tracking-wider px-4 py-3 hover:bg-white hover:text-black transition-all duration-150 shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1">
              SETTINGS
            </button>
          </div>
        </div>
      </div>

      {/* Proposals Management */}
      {proposals.length === 0 ? (
        <div className="text-center p-8">
          <div className="bg-white border-4 border-black p-8 mx-auto max-w-md">
            <p className="font-mono font-bold text-lg">NO PROPOSALS TO MANAGE</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {proposals.map((id) => (
            <AdminProposalItem
              key={id}
              id={id}
              voteNft={voteNfts.find((nft) => nft.proposalId === id)}
              onAction={() => refetchDashboard()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function getDashboardFields(data: SuiObjectData) {
  if (data.content?.dataType !== "moveObject") return null;

  return data.content.fields as {
    id: SuiID;
    proposals_ids: string[];
  };
}

function extractVoteNfts(nftRes: PaginatedObjectsResponse | undefined) {
  if (!nftRes?.data) return [];

  return nftRes.data.map((nftObject) => getVoteNft(nftObject.data));
}

function getVoteNft(nftData: SuiObjectData | undefined | null): VoteNft {
  if (nftData?.content?.dataType !== "moveObject") {
    return { id: { id: "" }, url: "", proposalId: "" };
  }

  const { proposal_id: proposalId, url, id } = nftData.content.fields as any;

  return {
    proposalId,
    id,
    url,
  };
}

export default AdminView;

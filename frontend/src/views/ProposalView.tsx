import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../config/networkConfig";
import { PaginatedObjectsResponse, SuiObjectData } from "@mysten/sui/client";
import { ProposalItem } from "../components/proposal/ProposalItem";
import { useVoteNfts } from "../hooks/useVoteNfts";
import { VoteNft } from "../types";

const ProposalView = () => {
  const dashboardId = useNetworkVariable("dashboardId");
  const { data: voteNftsRes, refetch: refetchNfts } = useVoteNfts();

  const {
    data: dataResponse,
    isPending,
    error,
  } = useSuiClientQuery("getObject", {
    id: dashboardId,
    options: {
      showContent: true,
    },
  });

  if (isPending)
    return (
      <div className="text-center p-8">
        <div className="bg-white border-4 border-black p-8 mx-auto max-w-md">
          <p className="font-mono font-bold text-lg">LOADING...</p>
        </div>
      </div>
    );
    
  if (error) 
    return (
      <div className="text-center p-8">
        <div className="bg-black text-white border-4 border-black p-8 mx-auto max-w-md">
          <p className="font-mono font-bold text-lg">ERROR: {error.message}</p>
        </div>
      </div>
    );
    
  if (!dataResponse.data)
    return (
      <div className="text-center p-8">
        <div className="bg-black text-white border-4 border-black p-8 mx-auto max-w-md">
          <p className="font-mono font-bold text-lg">NOT FOUND...</p>
        </div>
      </div>
    );

  const voteNfts = extractVoteNfts(voteNftsRes as any);
  const proposals = getDashboardFields(dataResponse.data as any)?.proposals_ids || [];

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono uppercase tracking-wider mb-4 bg-white border-4 border-black p-4 sm:p-6 mx-auto max-w-fit shadow-brutal">
          PROPOSALS
        </h1>
        <p className="font-mono text-sm text-gray-600 mt-2">
          VOTE ON ACTIVE PROPOSALS
        </p>
      </div>
      
      {proposals.length === 0 ? (
        <div className="text-center p-8">
          <div className="bg-white border-4 border-black p-8 mx-auto max-w-md">
            <p className="font-mono font-bold text-lg">NO PROPOSALS YET</p>
            <p className="font-mono text-sm mt-2">CHECK BACK LATER OR CONTACT AN ADMIN!</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {proposals.map((id) => (
            <ProposalItem
              key={id}
              id={id}
              onVoteTxSuccess={() => refetchNfts()}
              voteNft={voteNfts.find((nft) => nft.proposalId === id)}
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

export default ProposalView;

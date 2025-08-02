import { useSuiClientQuery } from "@mysten/dapp-kit";
import { FC, useState } from "react";
import { EcText } from "../Shared";
import { SuiObjectData } from "@mysten/sui/client";
import { Proposal, VoteNft } from "../../types";
import { VoteModal } from "./VoteModal";


interface ProposalItemsProps {
  id: string;
  voteNft: VoteNft | undefined;
  onVoteTxSuccess: () => void;
};

export const ProposalItem: FC<ProposalItemsProps> = ({id, voteNft, onVoteTxSuccess}) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { data: dataResponse, refetch: refetchProposal, error, isPending} = useSuiClientQuery(
    "getObject", {
      id,
      options: {
        showContent: true
      }
    }
  );

  if (isPending) return (
    <div className="card-brutal p-6 min-h-[200px] flex items-center justify-center">
      <EcText centered text="LOADING..."/>
    </div>
  );
  
  if (error) return (
    <div className="bg-black text-white border-4 border-black p-6 min-h-[200px] flex items-center justify-center">
      <EcText isError text={`ERROR: ${error.message}`}/>
    </div>
  );
  
  if (!dataResponse.data) return null;

  const proposal = parseProposal(dataResponse.data as any);

  if (!proposal) return (
    <div className="bg-black text-white border-4 border-black p-6 min-h-[200px] flex items-center justify-center">
      <EcText text="NO DATA FOUND!"/>
    </div>
  );

  const expiration = proposal.expiration;
  const isDelisted = proposal.status.variant === "Delisted";
  const isExpired = isUnixTimeExpired(expiration) || isDelisted;

  return (
    <>
      <div
        onClick={() => !isExpired && setIsModelOpen(true)}
        className={`card-brutal p-6 transition-all duration-150 ${
          isExpired 
            ? "cursor-not-allowed opacity-60" 
            : "cursor-pointer hover:shadow-brutal-lg active:shadow-none active:translate-x-1 active:translate-y-1"
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg sm:text-xl font-bold font-mono uppercase tracking-wider break-words flex-1 mr-2">
            {proposal.title}
          </h3>
          {voteNft && (
            <div className="flex-shrink-0">
              <img 
                className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black" 
                src={voteNft.url} 
                alt="Vote NFT"
              />
            </div>
          )}
        </div>
        
        <p className="font-mono text-sm sm:text-base mb-6 break-words">
          {proposal.description}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex space-x-4 sm:space-x-6">
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
          
          <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
            {isDelisted ? (
              <span className="bg-black text-white border-2 border-black px-2 py-1">
                DELISTED
              </span>
            ) : isExpired ? (
              <span className="bg-black text-white border-2 border-black px-2 py-1">
                EXPIRED
              </span>
            ) : (
              <span className="bg-white border-2 border-black px-2 py-1">
                {formatUnixTime(expiration)}
              </span>
            )}
          </div>
        </div>
        
        {voteNft && (
          <div className="mt-4 flex justify-center">
            <span className="bg-black text-white border-2 border-black px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider">
              VOTED
            </span>
          </div>
        )}
      </div>
      
      <VoteModal
        proposal={proposal}
        hasVoted={!!voteNft}
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        onVote={(votedYes: boolean) => {
          console.log(votedYes);
          refetchProposal();
          onVoteTxSuccess();
          setIsModelOpen(false);
        }}
      />
    </>
  )
}

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

function formatUnixTime(timestampMs: number) {
  if (isUnixTimeExpired(timestampMs)) {
    return "EXPIRED";
  }

  const date = new Date(timestampMs);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  }) + " " + date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

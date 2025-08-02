import { FC } from "react";
import { VoteNft } from "../../types";

interface AdminStatsProps {
  proposals: string[];
  voteNfts: VoteNft[];
}

export const AdminStats: FC<AdminStatsProps> = ({ proposals, voteNfts }) => {
  const totalProposals = proposals.length;
  const totalVotes = voteNfts.length;
  const participationRate = totalProposals > 0 ? ((totalVotes / totalProposals) * 100).toFixed(1) : '0';

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Total Proposals */}
        <div className="bg-white border-4 border-black p-6 shadow-brutal">
          <div className="text-center">
            <h3 className="text-lg font-bold font-mono uppercase tracking-wider mb-2">TOTAL PROPOSALS</h3>
            <p className="text-3xl font-bold font-mono text-black">{totalProposals}</p>
          </div>
        </div>

        {/* Total Votes */}
        <div className="bg-black text-white border-4 border-black p-6 shadow-brutal">
          <div className="text-center">
            <h3 className="text-lg font-bold font-mono uppercase tracking-wider mb-2">TOTAL VOTES</h3>
            <p className="text-3xl font-bold font-mono text-white">{totalVotes}</p>
          </div>
        </div>

        {/* Participation Rate */}
        <div className="bg-white border-4 border-black p-6 shadow-brutal">
          <div className="text-center">
            <h3 className="text-lg font-bold font-mono uppercase tracking-wider mb-2">PARTICIPATION</h3>
            <p className="text-3xl font-bold font-mono text-black">{participationRate}%</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 bg-white border-4 border-black p-4 shadow-brutal">
        <h3 className="text-lg font-bold font-mono uppercase tracking-wider mb-4 text-center">QUICK OVERVIEW</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="font-mono font-bold text-sm uppercase tracking-wider text-gray-600">ACTIVE</p>
            <p className="font-mono text-lg font-bold">-</p>
          </div>
          <div>
            <p className="font-mono font-bold text-sm uppercase tracking-wider text-gray-600">EXPIRED</p>
            <p className="font-mono text-lg font-bold">-</p>
          </div>
          <div>
            <p className="font-mono font-bold text-sm uppercase tracking-wider text-gray-600">DELISTED</p>
            <p className="font-mono text-lg font-bold">-</p>
          </div>
          <div>
            <p className="font-mono font-bold text-sm uppercase tracking-wider text-gray-600">AVG VOTES</p>
            <p className="font-mono text-lg font-bold">{totalProposals > 0 ? Math.round(totalVotes / totalProposals) : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../config/networkConfig";
import { PaginatedObjectsResponse, SuiObjectData } from "@mysten/sui/client";
import { VoteNft, Proposal } from "../types";
import { useVoteNfts } from "../hooks/useVoteNfts";
import { FC, useMemo } from "react";

const AnalyticsView = () => {
  const dashboardId = useNetworkVariable("dashboardId");
  const { data: voteNftsRes } = useVoteNfts();

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

  // Get all proposals data
  const proposals = getDashboardFields(dataResponse?.data as any)?.proposals_ids || [];
  
  // Calculate analytics
  const analytics = useMemo(() => {
    const voteNfts = extractVoteNfts(voteNftsRes as any);
    
    return {
      totalProposals: proposals.length,
      totalVotes: voteNfts.length,
      averageVotesPerProposal: proposals.length > 0 ? (voteNfts.length / proposals.length).toFixed(1) : '0',
      participationRate: proposals.length > 0 ? ((voteNfts.length / proposals.length) * 100).toFixed(1) : '0',
      voteNfts
    };
  }, [proposals, voteNftsRes]);

  if (isPending) {
    return (
      <div className="text-center p-8">
        <div className="bg-white border-4 border-black p-8 mx-auto max-w-md">
          <p className="font-mono font-bold text-lg">LOADING ANALYTICS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="bg-black text-white border-4 border-black p-8 mx-auto max-w-md">
          <p className="font-mono font-bold text-lg">ERROR: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono uppercase tracking-wider mb-4 bg-white border-4 border-black p-4 sm:p-6 mx-auto max-w-fit shadow-brutal">
          ANALYTICS
        </h1>
        <p className="font-mono text-sm text-gray-600 mt-2">
          VOTING SYSTEM INSIGHTS & STATISTICS
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="TOTAL PROPOSALS"
          value={analytics.totalProposals.toString()}
          icon="📝"
          bgColor="bg-white"
          textColor="text-black"
        />
        <MetricCard
          title="TOTAL VOTES"
          value={analytics.totalVotes.toString()}
          icon="🗳️"
          bgColor="bg-black"
          textColor="text-white"
        />
        <MetricCard
          title="AVG VOTES/PROPOSAL"
          value={analytics.averageVotesPerProposal}
          icon="📊"
          bgColor="bg-white"
          textColor="text-black"
        />
        <MetricCard
          title="PARTICIPATION RATE"
          value={`${analytics.participationRate}%`}
          icon="📈"
          bgColor="bg-black"
          textColor="text-white"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Voting Activity Chart */}
        <div className="bg-white border-4 border-black p-6 shadow-brutal">
          <h2 className="text-xl font-bold font-mono uppercase tracking-wider mb-4 text-center">
            VOTING ACTIVITY
          </h2>
          <div className="h-64 flex items-center justify-center border-2 border-gray-300">
            <p className="font-mono text-gray-500 text-center">
              CHART PLACEHOLDER<br />
              <span className="text-sm">IMPLEMENT WITH CHART.JS</span>
            </p>
          </div>
        </div>

        {/* Proposal Status Distribution */}
        <div className="bg-white border-4 border-black p-6 shadow-brutal">
          <h2 className="text-xl font-bold font-mono uppercase tracking-wider mb-4 text-center">
            PROPOSAL STATUS
          </h2>
          <div className="h-64 flex items-center justify-center border-2 border-gray-300">
            <p className="font-mono text-gray-500 text-center">
              PIE CHART PLACEHOLDER<br />
              <span className="text-sm">ACTIVE / EXPIRED / DELISTED</span>
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border-4 border-black p-6 shadow-brutal mb-8">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wider mb-4">RECENT ACTIVITY</h2>
        <div className="space-y-3">
          {analytics.voteNfts.slice(0, 5).map((nft, index) => (
            <div key={nft.id.id} className="flex justify-between items-center p-3 bg-gray-50 border-2 border-gray-300">
              <div className="flex items-center">
                <span className="w-8 h-8 bg-black text-white border-2 border-black flex items-center justify-center text-xs font-mono font-bold mr-3">
                  {index + 1}
                </span>
                <div>
                  <p className="font-mono font-bold text-sm">VOTE CAST</p>
                  <p className="font-mono text-xs text-gray-600">Proposal: {nft.proposalId.slice(0, 8)}...</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-gray-600">RECENT</p>
              </div>
            </div>
          ))}
          {analytics.voteNfts.length === 0 && (
            <div className="text-center p-8">
              <p className="font-mono font-bold text-gray-500">NO RECENT ACTIVITY</p>
            </div>
          )}
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SystemHealthCard
          title="SYSTEM STATUS"
          status="OPERATIONAL"
          statusColor="bg-green-500"
          details="ALL SYSTEMS RUNNING"
        />
        <SystemHealthCard
          title="NETWORK"
          status="CONNECTED"
          statusColor="bg-blue-500"
          details="SUI NETWORK ACTIVE"
        />
        <SystemHealthCard
          title="SMART CONTRACTS"
          status="DEPLOYED"
          statusColor="bg-purple-500"
          details="CONTRACTS VERIFIED"
        />
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

const MetricCard: FC<MetricCardProps> = ({ title, value, icon, bgColor, textColor }) => (
  <div className={`${bgColor} ${textColor} border-4 border-black p-6 shadow-brutal`}>
    <div className="text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-sm font-bold font-mono uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-2xl font-bold font-mono">{value}</p>
    </div>
  </div>
);

interface SystemHealthCardProps {
  title: string;
  status: string;
  statusColor: string;
  details: string;
}

const SystemHealthCard: FC<SystemHealthCardProps> = ({ title, status, statusColor, details }) => (
  <div className="bg-white border-4 border-black p-4 shadow-brutal">
    <h3 className="text-sm font-bold font-mono uppercase tracking-wider mb-3">{title}</h3>
    <div className="flex items-center justify-between">
      <div>
        <span className={`${statusColor} text-white border-2 border-black px-2 py-1 text-xs font-mono font-bold uppercase tracking-wider`}>
          {status}
        </span>
        <p className="font-mono text-xs text-gray-600 mt-2">{details}</p>
      </div>
      <div className="w-3 h-3 bg-green-500 border border-black rounded-full animate-pulse"></div>
    </div>
  </div>
);

function getDashboardFields(data: SuiObjectData) {
  if (data?.content?.dataType !== "moveObject") return null;

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

export default AnalyticsView;

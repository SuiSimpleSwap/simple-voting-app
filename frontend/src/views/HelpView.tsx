import { FC, useState } from "react";

const HelpView = () => {
  const [activeSection, setActiveSection] = useState<string>("getting-started");

  const sections = [
    { id: "getting-started", title: "GETTING STARTED", icon: "🚀" },
    { id: "voting", title: "HOW TO VOTE", icon: "🗳️" },
    { id: "proposals", title: "CREATING PROPOSALS", icon: "📝" },
    { id: "wallet", title: "WALLET SETUP", icon: "👛" },
    { id: "nfts", title: "VOTE NFTs", icon: "🎨" },
    { id: "troubleshooting", title: "TROUBLESHOOTING", icon: "🔧" },
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono uppercase tracking-wider mb-4 bg-white border-4 border-black p-4 sm:p-6 mx-auto max-w-fit shadow-brutal">
          HELP CENTER
        </h1>
        <p className="font-mono text-sm text-gray-600 mt-2">
          EVERYTHING YOU NEED TO KNOW ABOUT THE VOTING SYSTEM
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white border-4 border-black p-4 shadow-brutal sticky top-4">
            <h2 className="text-lg font-bold font-mono uppercase tracking-wider mb-4">TOPICS</h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 border-2 border-black font-mono font-bold uppercase tracking-wider text-sm transition-all duration-150 ${
                    activeSection === section.id
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white border-4 border-black p-6 shadow-brutal">
            {activeSection === "getting-started" && <GettingStartedContent />}
            {activeSection === "voting" && <VotingContent />}
            {activeSection === "proposals" && <ProposalsContent />}
            {activeSection === "wallet" && <WalletContent />}
            {activeSection === "nfts" && <NFTsContent />}
            {activeSection === "troubleshooting" && <TroubleshootingContent />}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-black text-white border-4 border-black p-6 shadow-brutal">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wider mb-4 text-center">QUICK ACTIONS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="CONNECT WALLET"
            description="GET STARTED WITH VOTING"
            action="CONNECT NOW"
          />
          <QuickActionCard
            title="VIEW PROPOSALS"
            description="SEE ALL ACTIVE PROPOSALS"
            action="BROWSE"
          />
          <QuickActionCard
            title="CONTACT SUPPORT"
            description="NEED MORE HELP?"
            action="GET HELP"
          />
        </div>
      </div>
    </div>
  );
};

const GettingStartedContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold font-mono uppercase tracking-wider mb-4">🚀 GETTING STARTED</h2>
    
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">STEP 1: CONNECT YOUR WALLET</h3>
        <p className="font-mono text-sm">
          Click the "CONNECT WALLET" button in the top navigation to connect your SUI wallet. 
          We support all major SUI wallets including Sui Wallet, Ethos Wallet, and more.
        </p>
      </div>

      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">STEP 2: BROWSE PROPOSALS</h3>
        <p className="font-mono text-sm">
          Navigate to the home page to see all active proposals. Each proposal shows the title, 
          description, current vote counts, and expiration date.
        </p>
      </div>

      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">STEP 3: VOTE ON PROPOSALS</h3>
        <p className="font-mono text-sm">
          Click on any active proposal to open the voting modal. Choose "VOTE YES" or "VOTE NO" 
          and confirm the transaction in your wallet.
        </p>
      </div>

      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">STEP 4: RECEIVE YOUR NFT</h3>
        <p className="font-mono text-sm">
          After voting, you'll receive a unique Vote Proof NFT that serves as proof of your participation 
          in the democratic process.
        </p>
      </div>
    </div>
  </div>
);

const VotingContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold font-mono uppercase tracking-wider mb-4">🗳️ HOW TO VOTE</h2>
    
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">VOTING REQUIREMENTS</h3>
        <ul className="font-mono text-sm space-y-1">
          <li>• CONNECTED SUI WALLET</li>
          <li>• SUFFICIENT SUI FOR GAS FEES</li>
          <li>• PROPOSAL MUST BE ACTIVE</li>
          <li>• ONE VOTE PER WALLET PER PROPOSAL</li>
        </ul>
      </div>

      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">VOTING PROCESS</h3>
        <ol className="font-mono text-sm space-y-1">
          <li>1. CLICK ON AN ACTIVE PROPOSAL</li>
          <li>2. READ THE PROPOSAL DETAILS</li>
          <li>3. CHOOSE "VOTE YES" OR "VOTE NO"</li>
          <li>4. CONFIRM TRANSACTION IN WALLET</li>
          <li>5. WAIT FOR TRANSACTION CONFIRMATION</li>
          <li>6. RECEIVE YOUR VOTE PROOF NFT</li>
        </ol>
      </div>

      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">IMPORTANT NOTES</h3>
        <ul className="font-mono text-sm space-y-1">
          <li>• VOTES ARE PERMANENT AND CANNOT BE CHANGED</li>
          <li>• VOTING REQUIRES GAS FEES (SMALL AMOUNT OF SUI)</li>
          <li>• EXPIRED PROPOSALS CANNOT BE VOTED ON</li>
          <li>• YOUR VOTE IS RECORDED ON THE BLOCKCHAIN</li>
        </ul>
      </div>
    </div>
  </div>
);

const ProposalsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold font-mono uppercase tracking-wider mb-4">📝 CREATING PROPOSALS</h2>
    
    <div className="p-4 bg-yellow-100 border-2 border-yellow-500">
      <p className="font-mono font-bold text-yellow-800">
        ⚠️ ADMIN PRIVILEGES REQUIRED: Only users with admin capabilities can create proposals.
      </p>
    </div>

    <div className="space-y-4">
      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">PROPOSAL REQUIREMENTS</h3>
        <ul className="font-mono text-sm space-y-1">
          <li>• ADMIN CAPABILITY (ADMIN CAP NFT)</li>
          <li>• CLEAR, DESCRIPTIVE TITLE (MIN 3 CHARACTERS)</li>
          <li>• DETAILED DESCRIPTION (MIN 10 CHARACTERS)</li>
          <li>• FUTURE EXPIRATION DATE/TIME</li>
          <li>• SUI FOR GAS FEES</li>
        </ul>
      </div>

      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">BEST PRACTICES</h3>
        <ul className="font-mono text-sm space-y-1">
          <li>• USE CLEAR, UNAMBIGUOUS LANGUAGE</li>
          <li>• PROVIDE SUFFICIENT CONTEXT</li>
          <li>• SET REASONABLE EXPIRATION TIMES</li>
          <li>• INCLUDE RELEVANT LINKS IF NEEDED</li>
          <li>• CONSIDER COMMUNITY IMPACT</li>
        </ul>
      </div>
    </div>
  </div>
);

const WalletContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold font-mono uppercase tracking-wider mb-4">👛 WALLET SETUP</h2>
    
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">SUPPORTED WALLETS</h3>
        <ul className="font-mono text-sm space-y-1">
          <li>• SUI WALLET (RECOMMENDED)</li>
          <li>• ETHOS WALLET</li>
          <li>• SUIET WALLET</li>
          <li>• GLASS WALLET</li>
        </ul>
      </div>

      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">SETUP INSTRUCTIONS</h3>
        <ol className="font-mono text-sm space-y-1">
          <li>1. INSTALL A SUI WALLET EXTENSION</li>
          <li>2. CREATE A NEW WALLET OR IMPORT EXISTING</li>
          <li>3. SECURE YOUR SEED PHRASE</li>
          <li>4. ADD SUI TOKENS FOR GAS FEES</li>
          <li>5. CONNECT TO THE VOTING APP</li>
        </ol>
      </div>

      <div className="p-4 bg-red-100 border-2 border-red-500">
        <h3 className="font-mono font-bold text-lg mb-2 text-red-800">SECURITY REMINDER</h3>
        <p className="font-mono text-sm text-red-800">
          NEVER SHARE YOUR SEED PHRASE OR PRIVATE KEYS. KEEP THEM SECURE AND OFFLINE.
        </p>
      </div>
    </div>
  </div>
);

const NFTsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold font-mono uppercase tracking-wider mb-4">🎨 VOTE NFTs</h2>
    
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">WHAT ARE VOTE NFTs?</h3>
        <p className="font-mono text-sm">
          Vote Proof NFTs are unique digital tokens minted when you cast a vote. They serve as 
          permanent proof of your participation in the democratic process and can be viewed in 
          your wallet.
        </p>
      </div>

      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">NFT FEATURES</h3>
        <ul className="font-mono text-sm space-y-1">
          <li>• UNIQUE TO EACH VOTE CAST</li>
          <li>• CONTAINS PROPOSAL INFORMATION</li>
          <li>• PERMANENT BLOCKCHAIN RECORD</li>
          <li>• TRANSFERABLE (IF DESIRED)</li>
          <li>• COLLECTIBLE PROOF OF PARTICIPATION</li>
        </ul>
      </div>

      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">VIEWING YOUR NFTs</h3>
        <p className="font-mono text-sm">
          Visit the "WALLET" page to see all your Vote Proof NFTs and other SUI objects. 
          Each NFT displays the proposal you voted on and serves as your voting history.
        </p>
      </div>
    </div>
  </div>
);

const TroubleshootingContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold font-mono uppercase tracking-wider mb-4">🔧 TROUBLESHOOTING</h2>
    
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">COMMON ISSUES</h3>
        <div className="space-y-3">
          <div>
            <p className="font-mono font-bold text-sm">Q: WALLET WON'T CONNECT</p>
            <p className="font-mono text-xs">A: REFRESH PAGE, CHECK WALLET EXTENSION, ENSURE SUI NETWORK IS SELECTED</p>
          </div>
          <div>
            <p className="font-mono font-bold text-sm">Q: TRANSACTION FAILS</p>
            <p className="font-mono text-xs">A: CHECK SUI BALANCE FOR GAS FEES, ENSURE PROPOSAL IS STILL ACTIVE</p>
          </div>
          <div>
            <p className="font-mono font-bold text-sm">Q: ALREADY VOTED ERROR</p>
            <p className="font-mono text-xs">A: ONE VOTE PER WALLET PER PROPOSAL. CHECK IF YOU'VE ALREADY VOTED</p>
          </div>
          <div>
            <p className="font-mono font-bold text-sm">Q: PROPOSAL NOT LOADING</p>
            <p className="font-mono text-xs">A: REFRESH PAGE, CHECK NETWORK CONNECTION, PROPOSAL MAY BE EXPIRED</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-2 border-gray-300">
        <h3 className="font-mono font-bold text-lg mb-2">ERROR CODES</h3>
        <ul className="font-mono text-sm space-y-1">
          <li>• EDuplicateVote: YOU'VE ALREADY VOTED ON THIS PROPOSAL</li>
          <li>• EProposalDelisted: PROPOSAL HAS BEEN REMOVED BY ADMIN</li>
          <li>• EProposalExpired: VOTING PERIOD HAS ENDED</li>
          <li>• INSUFFICIENT_GAS: ADD MORE SUI TO YOUR WALLET</li>
        </ul>
      </div>

      <div className="p-4 bg-blue-100 border-2 border-blue-500">
        <h3 className="font-mono font-bold text-lg mb-2 text-blue-800">STILL NEED HELP?</h3>
        <p className="font-mono text-sm text-blue-800">
          CHECK THE SUI DOCUMENTATION OR CONTACT OUR SUPPORT TEAM FOR FURTHER ASSISTANCE.
        </p>
      </div>
    </div>
  </div>
);

interface QuickActionCardProps {
  title: string;
  description: string;
  action: string;
}

const QuickActionCard: FC<QuickActionCardProps> = ({ title, description, action }) => (
  <div className="bg-white text-black border-4 border-white p-4">
    <h3 className="font-mono font-bold text-sm mb-2">{title}</h3>
    <p className="font-mono text-xs mb-3">{description}</p>
    <button className="w-full bg-black text-white border-2 border-black font-mono font-bold uppercase tracking-wider px-3 py-2 text-xs hover:bg-white hover:text-black transition-all duration-150">
      {action}
    </button>
  </div>
);

export default HelpView;

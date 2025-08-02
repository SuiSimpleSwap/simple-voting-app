import { ConnectButton } from "@mysten/dapp-kit";
import { useNavigation } from "../providers/navigation/NavigationContext";

const Navbar = () => {
  const {currentPage, navigate} = useNavigation()

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/analytics", label: "ANALYTICS" },
    { path: "/admin", label: "ADMIN" },
    { path: "/wallet", label: "WALLET" },
    { path: "/help", label: "HELP" },
  ];

  return (
    <nav className="bg-white border-b-4 border-black p-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-bold font-mono uppercase tracking-wider mr-6">
            VOTING APP
          </h1>
        </div>
        
        <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`px-3 py-2 sm:px-4 sm:py-2 border-4 border-black font-mono font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-150 ${
                  currentPage === item.path 
                    ? "bg-black text-white" 
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        
        <div className="connect-button-container">
          <ConnectButton 
            style={{
              backgroundColor: '#ffffff',
              color: '#000000',
              border: '4px solid #000000',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '8px 16px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

import { FC } from "react";
import { useNavigation } from "../providers/navigation/NavigationContext";

const Footer: FC = () => {
  const { navigate } = useNavigation();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t-4 border-black mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Branding */}
          <div>
            <h3 className="text-lg font-bold font-mono uppercase tracking-wider mb-4">
              VOTING APP
            </h3>
            <p className="font-mono text-sm text-gray-300">
              DECENTRALIZED VOTING ON THE SUI BLOCKCHAIN. TRANSPARENT, SECURE, AND IMMUTABLE.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-mono uppercase tracking-wider mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate("/")}
                  className="font-mono text-sm text-gray-300 hover:text-white transition-colors"
                >
                  HOME
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/analytics")}
                  className="font-mono text-sm text-gray-300 hover:text-white transition-colors"
                >
                  ANALYTICS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/help")}
                  className="font-mono text-sm text-gray-300 hover:text-white transition-colors"
                >
                  HELP CENTER
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold font-mono uppercase tracking-wider mb-4">
              RESOURCES
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://docs.sui.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-gray-300 hover:text-white transition-colors"
                >
                  SUI DOCS
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-gray-300 hover:text-white transition-colors"
                >
                  GITHUB
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/sui" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-gray-300 hover:text-white transition-colors"
                >
                  DISCORD
                </a>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h4 className="text-sm font-bold font-mono uppercase tracking-wider mb-4">
              NETWORK STATUS
            </h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="font-mono text-sm text-gray-300">SUI NETWORK</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="font-mono text-sm text-gray-300">CONTRACTS</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="font-mono text-sm text-gray-300">IPFS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-mono text-sm text-gray-400">
            © {currentYear} VOTING APP. BUILT ON SUI BLOCKCHAIN.
          </p>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
              POWERED BY
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white border-2 border-white flex items-center justify-center">
                <span className="text-black font-bold text-xs">SUI</span>
              </div>
              <span className="font-mono text-sm text-white font-bold">SUI NETWORK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

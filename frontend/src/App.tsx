import React from "react";
import ProposalView from "./views/ProposalView";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WalletView from "./views/WalletView";
import AdminView from "./views/AdminView";
import AnalyticsView from "./views/AnalyticsView";
import HelpView from "./views/HelpView";
import { useNavigation } from "./providers/navigation/NavigationContext";
import { ToastContainer } from "react-toastify";

const Pages = () => {
  const { currentPage } = useNavigation();

  switch(currentPage) {
    case "/":
      return <ProposalView />
    case "/wallet":
      return <WalletView />
    case "/admin":
      return <AdminView />
    case "/analytics":
      return <AnalyticsView />
    case "/help":
      return <HelpView />
    default:
      return (
        <div className="text-center p-8">
          <div className="bg-white border-4 border-black p-8 mx-auto max-w-md">
            <h1 className="text-2xl font-bold font-mono uppercase tracking-wider mb-4">404</h1>
            <p className="font-mono font-bold">Page not found!</p>
          </div>
        </div>
      )
  }
};

const App: React.FC = () => {
  return (
    <>
      <ToastContainer 
        toastStyle={{
          backgroundColor: '#000000',
          color: '#ffffff',
          border: '4px solid #000000',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700,
        }}
      />
      <div className="min-h-screen bg-white text-black font-mono flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto pt-4 px-4 sm:px-6 lg:px-8">
            <Pages />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;

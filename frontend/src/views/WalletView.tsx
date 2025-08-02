import { WalletStatus } from "../components/wallet/Status";

const WalletView = () => {
    return (
      <div className="py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono uppercase tracking-wider mb-4 bg-white border-4 border-black p-4 sm:p-6 mx-auto max-w-fit shadow-brutal">
            WALLET INFO
          </h1>
        </div>
        <WalletStatus />
      </div>
    )
};

export default WalletView;

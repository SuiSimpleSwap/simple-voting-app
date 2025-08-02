
import { useCurrentAccount } from "@mysten/dapp-kit"
import { OwnedObjects } from "../OwnedObjects";

export const WalletStatus = () => {
  const account = useCurrentAccount();

  return (
    <div className="card-brutal p-6 mb-8">
      <h2 className="text-xl sm:text-2xl font-bold font-mono uppercase tracking-wider mb-6 bg-black text-white border-2 border-black p-3 inline-block">
        WALLET STATUS
      </h2>
      
      {account ? (
        <div className="space-y-4">
          <div className="bg-white border-2 border-black p-4">
            <p className="font-mono font-bold uppercase tracking-wider text-sm mb-2">STATUS:</p>
            <p className="font-mono text-sm">CONNECTED</p>
          </div>
          
          <div className="bg-white border-2 border-black p-4 break-all">
            <p className="font-mono font-bold uppercase tracking-wider text-sm mb-2">ADDRESS:</p>
            <p className="font-mono text-xs sm:text-sm break-all">{account.address}</p>
          </div>
        </div>
      ) : (
        <div className="bg-black text-white border-2 border-black p-4">
          <p className="font-mono font-bold uppercase tracking-wider">WALLET NOT CONNECTED</p>
        </div>
      )}

      <OwnedObjects />
    </div>
  )
}

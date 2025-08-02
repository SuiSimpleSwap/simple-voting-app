import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiObject } from "./SuiObject";

export const OwnedObjects = () => {
  const account = useCurrentAccount();
  const { data: response, error, isPending } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      options: {
        showType: true,
        showOwner: true,
        showContent: true
      }
    },
    {
      enabled: !!account
    }
  );

  if (!account) return (
    <div className="mt-6 bg-black text-white border-2 border-black p-4">
      <p className="font-mono font-bold uppercase tracking-wider">CANNOT RETRIEVE ACCOUNT</p>
    </div>
  );
  
  if (error) return (
    <div className="mt-6 bg-black text-white border-2 border-black p-4">
      <p className="font-mono font-bold uppercase tracking-wider">ERROR: {error.message}</p>
    </div>
  );
  
  if (isPending || !response) return (
    <div className="mt-6 bg-white border-2 border-black p-4">
      <p className="font-mono font-bold uppercase tracking-wider text-center">LOADING...</p>
    </div>
  );

  return (
    <div className="mt-6">
      {response.data.length === 0 ? (
        <div className="bg-white border-2 border-black p-4">
          <p className="font-mono font-bold uppercase tracking-wider text-center">
            NO OBJECTS OWNED BY CONNECTED WALLET
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-lg sm:text-xl font-bold font-mono uppercase tracking-wider mb-4 bg-black text-white border-2 border-black p-3 inline-block">
            OWNED OBJECTS ({response.data.length})
          </h2>
          <div className="space-y-4">
            {response.data.map(objectRes => (
              <SuiObject
                key={objectRes.data?.objectId}
                objectRes={objectRes as any}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

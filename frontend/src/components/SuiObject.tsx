import { SuiObjectResponse } from "@mysten/sui/client"
import { FC } from "react";

type SuiObjectProps = {
  objectRes: SuiObjectResponse
};

export const SuiObject: FC<SuiObjectProps> = ({ objectRes }) => {
  const owner = objectRes.data?.owner;
  const objectType = objectRes.data?.type;
  const isCoin = objectType?.includes("0x2::coin::Coin");
  const balance = isCoin ? (objectRes.data?.content as any)?.fields?.balance : -1;

  return (
    <div className="card-brutal p-4">
      <div className="space-y-3">
        <div className="bg-white border-2 border-black p-2 break-all">
          <p className="font-mono font-bold uppercase tracking-wider text-xs mb-1">ID:</p>
          <p className="font-mono text-xs break-all">{objectRes.data?.objectId}</p>
        </div>
        
        <div className="bg-white border-2 border-black p-2 break-all">
          <p className="font-mono font-bold uppercase tracking-wider text-xs mb-1">TYPE:</p>
          <p className="font-mono text-xs break-all">{objectType || "UNKNOWN"}</p>
        </div>
        
        <div className="bg-white border-2 border-black p-2 break-all">
          <p className="font-mono font-bold uppercase tracking-wider text-xs mb-1">OWNER:</p>
          <p className="font-mono text-xs break-all">
            {typeof owner === "object" && owner !== null && "AddressOwner" in owner
              ? owner.AddressOwner
              : "UNKNOWN"
            }
          </p>
        </div>
        
        {isCoin && (
          <div className="bg-black text-white border-2 border-black p-2">
            <p className="font-mono font-bold uppercase tracking-wider text-xs mb-1">BALANCE:</p>
            <p className="font-mono text-xs">{balance || "0"}</p>
          </div>
        )}
      </div>
    </div>
  )
};

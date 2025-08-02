import { FC, useState } from "react";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../../config/networkConfig";

export const CreateProposal: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiration, setExpiration] = useState("");
  const {
    mutate: signAndExecute,
    isPending,
    isSuccess,
    error,
  } = useSignAndExecuteTransaction();
  const packageId = useNetworkVariable("packageId");
  const adminCapId = useNetworkVariable("adminCapId");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signAndExecute({
      transaction: {
        kind: "moveCall",
        data: {
          packageObjectId: packageId,
          module: "proposal",
          function: "create",
          arguments: [
            adminCapId,
            title,
            description,
            Number(expiration), // pastikan number, bukan string
          ],
          gasBudget: 100000000,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="create-proposal-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="input"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="input"
      />
      <input
        type="number"
        placeholder="Expiration (timestamp ms)"
        value={expiration}
        onChange={(e) => setExpiration(e.target.value)}
        required
        className="input"
      />
      <button type="submit" disabled={isPending} className="btn">
        {isPending ? "Creating..." : "Create Proposal"}
      </button>
      {isSuccess && <div className="text-green-500">Proposal created!</div>}
      {error && <div className="text-red-500">{error.message}</div>}
    </form>
  );
};

import { useSuiClientQuery } from "@mysten/dapp-kit";
import { FC } from "react";
import { EcText } from "../Shared";


type ProposalItemsProps = {
  id: string
};

export const ProposalItem: FC<ProposalItemsProps> = ({id}) => {
  const { data: dataResponse, error, isPending} = useSuiClientQuery(
    "getObject", {
      id,
      options: {
        showContent: true
      }
    }
  );

  if (isPending) return <EcText centered text="Loading..."/>;
  if (error) return <EcText isError text={`Error: ${error.message}`}/>;
  if (!dataResponse.data) return <EcText text="Not Found"/>;

  console.log(dataResponse.data);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:border-blue-500 transition-colors">
      <p className="text-xl font-semibold mb-2">Title: {id}</p>
      <p className="text-gray-700 dark:text-gray-300">Desc: What is your vote ?</p>
    </div>
  )
}

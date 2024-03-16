import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type SignLeaseArgs = {
  leaseId: bigint;
};

type SignLeaseFunctionNames = "signLease";

export const useSignLease = () => {
  //@ts-ignore
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite<SignLeaseFunctionNames, SignLeaseArgs>({
    contractName: "LeaseAgreement",
    functionName: "signLease",
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const signLease = (leaseId: number) => {
    const leaseIdBigInt = BigInt(leaseId);
    const value = parseEther("0"); // Replace this with the appropriate value if needed

    writeAsync({
      //@ts-ignore
      args: [leaseIdBigInt],
      value,
    });
  };

  return { signLease, isLoading, isMining };
};

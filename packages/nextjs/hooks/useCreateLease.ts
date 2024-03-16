import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type CreateLeaseArgs = {
  propertyAddress: string;
  leaseLength: bigint;
  tenantAddress: string;
};

type CreateLeaseFunctionNames = "createLease";

export const useCreateLease = () => {
  //@ts-ignore
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite<CreateLeaseFunctionNames, CreateLeaseArgs>({
    contractName: "LeaseAgreement",
    functionName: "createLease",
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const createLease = (propertyAddress: string, leaseLength: number, tenantAddress: string) => {
    const leaseLengthBigInt = BigInt(leaseLength);
    const value = parseEther("0"); // Replace this with the appropriate value if needed

    writeAsync({
      //@ts-ignore
      args: [propertyAddress, leaseLengthBigInt, tenantAddress],
      value,
    });
  };

  return { createLease, isLoading, isMining };
};

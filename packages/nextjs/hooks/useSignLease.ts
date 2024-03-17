import { useScaffoldContractWrite } from "./scaffold-eth/useScaffoldContractWrite";

// Ensure you have the correct import for parseEther if needed
// import { parseEther } from "ethers";

type SignLeaseArgs = {
  leaseId: bigint;
  tenantAddress: string;
  propertyAddress: string;
  leaseLength: bigint; // Assuming leaseLength needs to be a bigint
};

type SignLeaseFunctionNames = "signLease";

export const useSignLease = () => {
  //@ts-ignore
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite<SignLeaseFunctionNames, SignLeaseArgs>({
    contractName: "LeaseAgreement",
    functionName: "signLease",
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt: { blockHash: any }) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const signLease = (leaseId: number, tenantAddress: string, propertyAddress: string, leaseLength: number) => {
    const leaseIdBigInt = BigInt(leaseId);
    const leaseLengthBigInt = BigInt(leaseLength); // Convert leaseLength to BigInt
    console.log("Signing lease with length:", leaseLength); // Debugging line

    writeAsync({
      //@ts-ignore
      args: [leaseIdBigInt, tenantAddress, propertyAddress, leaseLengthBigInt],
      // value, // Include this if your function requires an ETH transfer
    }).catch((error: any) => console.error(error)); // It's a good practice to catch and handle errors
  };

  return { signLease, isLoading, isMining };
};

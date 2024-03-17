// Ensure this import is correct; it might be 'ethers' instead of 'viem'
import { useScaffoldContractWrite } from "./scaffold-eth/useScaffoldContractWrite";

// Update the type to include tenantAddress
type SignLeaseArgs = {
  leaseId: bigint;
  tenantAddress: string;
};

type SignLeaseFunctionNames = "signLeaseTest";

// export const useSignLease = () => {
//   //@ts-ignore
//   const { writeAsync, isLoading, isMining } = useScaffoldContractWrite<SignLeaseFunctionNames, SignLeaseArgs>({
//     contractName: "LeaseAgreement",
//     functionName: "signLeaseTest",
//     blockConfirmations: 1,
//     onBlockConfirmation: (txnReceipt: { blockHash: any }) => {
//       console.log("Transaction blockHash", txnReceipt.blockHash);
//     },
//   });

//   // Modify the signLease function to accept tenantAddress
//   const signLease = (leaseId: number, tenantAddress: string) => {
//     const leaseIdBigInt = BigInt(leaseId);

//     writeAsync({
//       //@ts-ignore
//       args: [leaseIdBigInt, tenantAddress], // Pass both leaseId and tenantAddress to the smart contract
//       // value, // Include this if your function requires an ETH transfer
//     }).catch((error: any) => console.error(error)); // It's a good practice to catch and handle errors
//   };

//   return { signLease, isLoading, isMining };

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

  // Modify the signLease function to accept tenantAddress
  const signLease = (leaseId: number, tenantAddress: string) => {
    const leaseIdBigInt = BigInt(leaseId);
    // const value = parseEther("0"); // Only include if your contract method requires sending ETH

    writeAsync({
      //@ts-ignore
      args: [leaseIdBigInt, tenantAddress, "Hello", 5], // Pass both leaseId and tenantAddress to the smart contract
      // value, // Include this if your function requires an ETH transfer
    }).catch((error: any) => console.error(error)); // It's a good practice to catch and handle errors
  };

  return { signLease, isLoading, isMining };
};

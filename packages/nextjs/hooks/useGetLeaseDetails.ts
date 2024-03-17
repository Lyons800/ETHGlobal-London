import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

// Adjust the import path as necessary

type LeaseDetails = {
  propertyAddress: string;
  leaseLength: bigint;
  tenantAddress: string;
  signed: boolean;
};

type GetLeaseDetailsFunctionNames = "getLeaseDetails"; // Ensure this matches the function name in your contract

export const useGetLeaseDetails = (leaseId: number) => {
  const { data, isLoading, isError, error, refetch } = useScaffoldContractRead<
    //@ts-ignore
    GetLeaseDetailsFunctionNames,
    //@ts-ignore
    LeaseDetails
  >({
    contractName: "LeaseAgreement", // The name of your deployed contract
    functionName: "getLeaseDetails",
    args: [leaseId],
  });

  return { data, isLoading, isError, error, refetch };
};

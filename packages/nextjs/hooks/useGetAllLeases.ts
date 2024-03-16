import { useScaffoldContractRead } from "./scaffold-eth/useScaffoldContractRead";

// Assuming you have a new function getLeaseNftTokenIds in your contract
export const useGetAllLeasesWithNfts = () => {
  const {
    data: leaseData,
    isLoading: leaseLoading,
    isError: leaseError,
    error: leaseErrorDetail,
  } = useScaffoldContractRead({
    contractName: "LeaseAgreement",
    functionName: "getAllLeases",
  });

  const {
    data: nftData,
    isLoading: nftLoading,
    isError: nftError,
    error: nftErrorDetail,
  } = useScaffoldContractRead({
    contractName: "LeaseAgreement",
    functionName: "getLeaseNftTokenIds",
  });

  const isLoading = leaseLoading || nftLoading;
  const isError = leaseError || nftError;
  const error = leaseErrorDetail || nftErrorDetail;

  let combinedData = null;
  if (leaseData && nftData) {
    combinedData = leaseData[0].map((address, index) => ({
      tenantAddress: address,
      leaseLength: leaseData[1][index],
      signed: leaseData[2][index],
      tokenId: nftData[index],
    }));
  }

  return { data: combinedData, isLoading, isError, error };
};

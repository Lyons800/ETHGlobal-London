import React from "react";
import { useScaffoldContractRead } from "./scaffold-eth";

export const useLeaseDetailsByTenant = (tenantAddress: string) => {
  const { data, isError, isLoading, refetch } = useScaffoldContractRead({
    contractName: "LeaseNFT",
    functionName: "getNftsByTenant",
    args: [tenantAddress],
    watch: true,
  });

  // Process the returned data to create leaseDetails
  const leaseDetails = React.useMemo(() => {
    // Check if data exists and has the expected structure
    if (!data || !Array.isArray(data[0]) || !Array.isArray(data[1]) || !Array.isArray(data[2])) return [];

    console.log("data", data);

    const [nftIds, propertyAddresses, leaseLengths] = data;

    // Map over the nftIds to create an array of lease details
    return nftIds.map((id, index) => ({
      nftId: id.toString(),
      propertyAddress: propertyAddresses[index],
      leaseLength: leaseLengths[index].toString(),
      tenantAddress,
    }));
  }, [data, tenantAddress]);

  return { leaseDetails, isError, isLoading, refetch };
};

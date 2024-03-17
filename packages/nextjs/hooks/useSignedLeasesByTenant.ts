// import React from "react";
// import { useScaffoldContractRead } from "./scaffold-eth";

// export const useLeaseDetailsByTenant = (tenantAddress: string) => {
//   const { data, isError, isLoading, refetch } = useScaffoldContractRead({
//     contractName: "LeaseNFT",
//     functionName: "getNftsByTenant",
//     args: [tenantAddress],
//     watch: true,
//   });

//   // Process the returned data to create leaseDetails
//   const leaseDetails = React.useMemo(() => {
//     if (!data || !data.nftIds) return [];

//     return data.nftIds.map((id: any, index: any) => ({
//       propertyAddress: data.propertyAddresses[index],
//       leaseLength: data.leaseLengths[index].toString(),
//       tenantAddress,
//       nftId: id.toString(),
//     }));
//   }, [data, tenantAddress]);

//   return { leaseDetails: data ? leaseDetails : [], isError, isLoading, refetch };
// };

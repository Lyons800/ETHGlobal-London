// import React from "react";
// import { useLeaseDetailsByTenant } from "~~/hooks/useSignedLeasesByTenant";

// const SignedLeaseList = ({ tenantAddress }: { tenantAddress: any }) => {
//   const { leaseDetails, isError, isLoading } = useLeaseDetailsByTenant(tenantAddress);

//   // You can use leaseDetails, isError, isLoading, and refetch in your UI code

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching lease details</div>;
//   }

//   return (
//     <div>
//       {leaseDetails.map((leaseDetail: any, index: number) => (
//         <div key={index}>
//           <p>Property Address: {leaseDetail.propertyAddress}</p>
//           <p>Lease Length: {leaseDetail.leaseLength}</p>
//           <p>Tenant Address: {leaseDetail.tenantAddress}</p>
//           {/* Display other lease details */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SignedLeaseList;

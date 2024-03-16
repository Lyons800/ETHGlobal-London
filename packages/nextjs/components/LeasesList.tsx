import React from "react";
import { useGetAllLeasesWithNfts } from "~~/hooks/useGetAllLeases";

// Update the import path as necessary

function LeaseList() {
  const { data, isLoading, isError, error } = useGetAllLeasesWithNfts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <h2>Leases and Associated NFTs</h2>
      {data &&
        data.map((lease, index) => (
          <div key={index}>
            <p>Tenant Address: {lease.tenantAddress}</p>
            {/* Check for undefined values and provide fallback */}
            <p>Lease Length: {lease.leaseLength?.toString() ?? "N/A"}</p>
            <p>Signed: {lease.signed ? "Yes" : "No"}</p>
            {/* Use optional chaining with fallback for tokenId */}
            <p>NFT Token ID: {lease.tokenId?.toString() ?? "N/A"}</p>
          </div>
        ))}
    </div>
  );
}

export default LeaseList;

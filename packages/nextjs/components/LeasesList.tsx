import React from "react";
import { useLeasesByTenant } from "~~/hooks/useGetTenantLeases";

// Adjust the path as necessary

const TenantLeases = ({ tenantAddress }: { tenantAddress: any }) => {
  const { data: leases, isError, isLoading } = useLeasesByTenant(tenantAddress);

  if (isLoading) return <div>Loading leases...</div>;
  if (isError || !leases) return <div>Error fetching leases.</div>;

  return (
    <div>
      <h2>Tenant Leases</h2>
      {leases.length === 0 ? (
        <p>No leases found for this tenant.</p>
      ) : (
        <ul>
          {leases.map((lease: any, index: any) => (
            <li key={index}>
              Lease ID: {lease.toString()} {/* Adjust according to what `getLeasesByTenant` actually returns */}
              {/* Further details can be added here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TenantLeases;

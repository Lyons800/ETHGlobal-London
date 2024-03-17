import React, { useState } from "react";
import { useCreateLease } from "~~/hooks/useCreateLease";

const CreateLeaseForm = () => {
  const [propertyAddress, setPropertyAddress] = useState("");
  const [leaseLength, setLeaseLength] = useState<number>(0); // or another sensible default
  const [tenantAddress, setTenantAddress] = useState("");

  const { createLease, isLoading, isMining } = useCreateLease();

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log({ propertyAddress, leaseLength, tenantAddress }); // More detailed logging
    if (leaseLength !== undefined) {
      // Ensure leaseLength is not undefined before proceeding
      createLease(propertyAddress, leaseLength, tenantAddress);
    } else {
      console.error("leaseLength is undefined");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="propertyAddress">Property Address:</label>
        <input
          type="text"
          id="propertyAddress"
          value={propertyAddress}
          onChange={e => setPropertyAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="leaseLength">Lease Length (days):</label>
        <input
          type="number"
          id="leaseLength"
          value={leaseLength}
          onChange={e => setLeaseLength(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="tenantAddress">Tenant Address:</label>
        <input type="text" id="tenantAddress" value={tenantAddress} onChange={e => setTenantAddress(e.target.value)} />
      </div>
      <button type="submit" disabled={isLoading || isMining}>
        {isMining ? "Creating Lease..." : "Create Lease"}
      </button>
    </form>
  );
};

export default CreateLeaseForm;

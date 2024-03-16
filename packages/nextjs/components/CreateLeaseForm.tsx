// components/CreateLeaseForm.js
import React, { useState } from "react";

// Adjust the import path as needed

const CreateLeaseForm = () => {
  const [propertyAddress, setPropertyAddress] = useState("");
  const [leaseLength, setLeaseLength] = useState("");
  const [tenantAddress, setTenantAddress] = useState("");
  //@ts-ignore
  const { createLease, isMining } = useCreateLease();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Convert leaseLength to a number. Adjust as needed for your contract's expected types
    const leaseLengthNum = Number(leaseLength);
    try {
      await createLease(propertyAddress, leaseLengthNum, tenantAddress);
      alert("Lease created successfully");
    } catch (error) {
      console.error("Error creating lease:", error);
      alert("Failed to create lease");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={propertyAddress}
        onChange={e => setPropertyAddress(e.target.value)}
        placeholder="Property Address"
        required
      />
      <input
        type="number"
        value={leaseLength}
        onChange={e => setLeaseLength(e.target.value)}
        placeholder="Lease Length"
        required
      />
      <input
        type="text"
        value={tenantAddress}
        onChange={e => setTenantAddress(e.target.value)}
        placeholder="Tenant Address"
        required
      />
      <button type="submit" disabled={isMining}>
        Create Lease
      </button>
    </form>
  );
};

export default CreateLeaseForm;

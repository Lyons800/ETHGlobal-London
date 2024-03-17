import React, { useState } from "react";
import { useSignLease } from "~~/hooks/useSignLease";

const SignLeaseComponent = ({ tenantAddress }: { tenantAddress: any }) => {
  const [leaseId, setLeaseId] = useState(0);
  const { signLease, isLoading, isMining } = useSignLease();

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    signLease(leaseId, tenantAddress);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="leaseId">Lease ID:</label>
        <input type="number" id="leaseId" value={leaseId} onChange={e => setLeaseId(parseInt(e.target.value))} />
      </div>
      <button type="submit" disabled={isLoading || isMining}>
        {isMining ? "Signing Lease..." : "Sign Lease"}
      </button>
    </form>
  );
};

export default SignLeaseComponent;

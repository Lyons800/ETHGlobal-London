import { useScaffoldContractRead } from "./scaffold-eth";

/**
 * A hook to retrieve all leases for a specific tenant.
 * Assumes there's a function getLeasesByTenant(address) in your smart contract that returns an array of lease details or lease IDs.
 * @param tenantAddress The address of the tenant whose leases you want to fetch.
 */
export const useLeasesByTenant = (tenantAddress: any) => {
  // Replace `YourContractName` with the actual contract name and `getLeasesByTenant` with the actual function name.
  const contractName = "LeaseAgreement"; // This should match the key in your deployedContracts.ts or externalContracts.ts
  const functionName = "getLeasesByTenant";

  const { data, isError, isLoading, refetch } = useScaffoldContractRead({
    contractName,
    functionName,
    args: [tenantAddress],
  });

  // Processing the data or error handling can be done here
  // For example, converting BigNumber to a more usable format if your data consists of BigNumber values

  return { data, isError, isLoading, refetch };
};

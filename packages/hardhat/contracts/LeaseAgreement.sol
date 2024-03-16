pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LeaseAgreement is Ownable {
	struct Lease {
		string propertyAddress;
		uint256 leaseLength; // Could be in days, months, etc.
		address tenantAddress;
		bool signed;
	}

	Lease[] public leases;

	function createLease(
		string memory propertyAddress,
		uint256 leaseLength,
		address tenantAddress
	) public onlyOwner {
		leases.push(Lease(propertyAddress, leaseLength, tenantAddress, false));
	}

	// In LeaseAgreement.sol

	function getLeaseDetails(
		uint256 leaseId
	)
		public
		view
		returns (
			string memory propertyAddress,
			uint256 leaseLength,
			address tenantAddress,
			bool signed
		)
	{
		Lease memory lease = leases[leaseId];
		return (
			lease.propertyAddress,
			lease.leaseLength,
			lease.tenantAddress,
			lease.signed
		);
	}
	function signLease(uint256 leaseId, address tenant) public {
		// Basic checks to ensure the lease exists and the tenant is correct
		require(leaseId < leases.length, "Lease does not exist.");
		require(
			leases[leaseId].tenantAddress == tenant,
			"Only the designated tenant can sign this lease."
		);

		// Additional checks can be added, for example, to prevent re-signing an already signed lease

		// Sign the lease
		leases[leaseId].signed = true;
	}

	// Additional functions such as modifying or cancelling leases could be added here.
}

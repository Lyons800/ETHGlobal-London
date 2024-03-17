// LeaseAgreement.sol

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ILeaseToken.sol"; // Make sure this path matches your project structure

contract LeaseAgreement is ILeaseAgreement, Ownable {
	struct Lease {
		string propertyAddress;
		uint256 leaseLength; // In days, months, etc.
		address tenantAddress;
		bool signed;
	}

	Lease[] public leases;
	address public leaseNftAddress;

	function setLeaseNftAddress(address _address) public onlyOwner {
		leaseNftAddress = _address;
	}

	function getLeaseDetails(
		uint256 leaseId
	)
		public
		view
		override
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

	function signLease(uint256 leaseId, address tenant) public override {
		require(leaseId < leases.length, "Lease does not exist.");
		require(
			leases[leaseId].tenantAddress == tenant,
			"Only the designated tenant can sign this lease."
		);
		require(!leases[leaseId].signed, "Lease already signed.");
		require(leaseNftAddress != address(0), "LeaseNFT address not set.");

		leases[leaseId].signed = true;

		// Here, call the LeaseNFT contract to mint the NFT
		ILeaseNFT(leaseNftAddress).mintLeaseNFT(leaseId, tenant, "TokenURI");
	}

	mapping(address => uint256[]) private tenantLeases;

	function getLeasesByTenant(
		address tenant
	) public view returns (uint256[] memory) {
		return tenantLeases[tenant];
	}

	function createLease(
		string memory propertyAddress,
		uint256 leaseLength,
		address tenantAddress
	) public {
		leases.push(Lease(propertyAddress, leaseLength, tenantAddress, false));
		uint256 leaseId = leases.length - 1;
		tenantLeases[tenantAddress].push(leaseId); // Update the mapping for the tenant
		emit LeaseCreated(leaseId, tenantAddress, leaseLength, 0); // tokenId is 0 since it's minted later
	}

	event LeaseCreated(
		uint256 indexed leaseId,
		address indexed tenantAddress,
		uint256 leaseLength,
		uint256 tokenId
	);
}

interface ILeaseNFT {
	function mintLeaseNFT(
		uint256 leaseId,
		address tenant,
		string memory tokenURI
	) external;
}

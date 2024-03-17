pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/ILeaseToken.sol"; // Make sure this path matches your project structure

contract LeaseNFT is ERC721URIStorage {
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	address public leaseAgreementAddress;

	// Add a mapping to link lease IDs to NFT IDs
	mapping(uint256 => uint256) public leaseIdToNftId;

	// Add a mapping to store tenant addresses and their NFT IDs
	mapping(address => uint256[]) private _tenantNftIds;

	// Add a struct to store the lease details
	struct Lease {
		string propertyAddress;
		uint256 leaseLength;
		address tenantAddress;
	}

	// Add a mapping to store the lease details for each NFT ID
	mapping(uint256 => Lease) public nftIdToLease;

	constructor(address _leaseAgreement) ERC721("LeaseNFT", "LEASE") {
		leaseAgreementAddress = _leaseAgreement;
	}

	function mintLeaseNFT(
		uint256 leaseId, // Add leaseId as an argument
		address tenant,
		string memory propertyAddress,
		uint256 leaseLength,
		string memory tokenURI
	) public {
		require(
			msg.sender == leaseAgreementAddress,
			"Only LeaseAgreement contract can mint."
		);
		_tokenIds.increment();
		uint256 newItemId = _tokenIds.current();
		_mint(tenant, newItemId);
		_setTokenURI(newItemId, tokenURI);

		// Link the lease ID to the NFT ID
		leaseIdToNftId[leaseId] = newItemId;

		// Store the lease details for the NFT ID
		Lease memory lease = Lease(propertyAddress, leaseLength, tenant);
		nftIdToLease[newItemId] = lease;

		// Add the NFT ID to the tenant's list of NFTs
		_tenantNftIds[tenant].push(newItemId);
	}

	// Add a function to retrieve the lease details for a specific NFT ID
	function getLeaseDetails(
		uint256 nftId
	) public view returns (string memory, uint256, address) {
		Lease memory lease = nftIdToLease[nftId];
		return (lease.propertyAddress, lease.leaseLength, lease.tenantAddress);
	}

	// Add a function to view all NFTs minted by a specific tenant, along with their details
	function getNftsByTenant(
		address tenantAddress
	)
		public
		view
		returns (
			uint256[] memory nftIds,
			string[] memory propertyAddresses,
			uint256[] memory leaseLengths
		)
	{
		nftIds = _tenantNftIds[tenantAddress];

		uint256 nftCount = nftIds.length;
		propertyAddresses = new string[](nftCount);
		leaseLengths = new uint256[](nftCount);

		for (uint256 i = 0; i < nftCount; i++) {
			Lease memory lease = nftIdToLease[nftIds[i]];
			propertyAddresses[i] = lease.propertyAddress;
			leaseLengths[i] = lease.leaseLength;
		}
	}

	// Add a function to view all NFTs minted by a specific tenant, along with their details
	function getAllLeases()
		public
		view
		returns (
			uint256[] memory nftIds,
			string[] memory propertyAddresses,
			uint256[] memory leaseLengths
		)
	{}
}

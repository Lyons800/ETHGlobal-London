// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // Import Ownable

contract LeaseToken is
	ERC721URIStorage,
	AccessControl,
	ReentrancyGuard,
	Ownable // Inherit Ownable
{
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	bytes32 public constant LEASE_SIGNER_ROLE = keccak256("LEASE_SIGNER_ROLE");

	struct LeaseDetails {
		address tenant;
		string propertyAddress;
		uint256 leaseLength; // in days, for simplicity
		bool tenantSigned;
		bool landlordSigned;
		string metadataURI;
	}

	mapping(uint256 => LeaseDetails) public leases;

	event LeaseSigned(uint256 indexed leaseId, address indexed signer);
	event LeaseFinalized(
		uint256 indexed leaseId,
		address indexed landlord,
		address indexed tenant
	);

	constructor(
		string memory name,
		string memory symbol
	) ERC721(name, symbol) {}

	function createLease(
		address tenant,
		string memory propertyAddress,
		uint256 leaseLength,
		string memory metadataURI
	) external returns (uint256) {
		_tokenIds.increment();

		uint256 newLeaseId = _tokenIds.current();
		leases[newLeaseId] = LeaseDetails(
			tenant,
			propertyAddress,
			leaseLength,
			false,
			false,
			metadataURI
		);

		// The landlord automatically signs upon lease creation
		leases[newLeaseId].landlordSigned = true;
		emit LeaseSigned(newLeaseId, msg.sender);

		return newLeaseId;
	}

	function signLease(uint256 leaseId) external nonReentrant {
		require(!_exists(leaseId), "Lease already finalized");
		require(
			leases[leaseId].tenant == msg.sender,
			"Only the designated tenant can sign this lease"
		);

		leases[leaseId].tenantSigned = true;
		emit LeaseSigned(leaseId, msg.sender);

		if (leases[leaseId].landlordSigned && leases[leaseId].tenantSigned) {
			_mint(leases[leaseId].tenant, leaseId);
			_setTokenURI(leaseId, leases[leaseId].metadataURI);
			emit LeaseFinalized(leaseId, owner(), leases[leaseId].tenant);
		}
	}

	function supportsInterface(
		bytes4 interfaceId
	) public view override(ERC721URIStorage, AccessControl) returns (bool) {
		return
			super.supportsInterface(interfaceId) ||
			AccessControl.supportsInterface(interfaceId);
	}

	// Implement any additional functions as needed
}

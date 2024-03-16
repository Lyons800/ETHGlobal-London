// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/ILeaseToken.sol"; // Import the interface instead of the actual contract

contract LeaseNFT is ERC721URIStorage {
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	address private leaseAgreementAddress;

	constructor(address _leaseAgreement) ERC721("LeaseNFT", "LEASE") {
		leaseAgreementAddress = _leaseAgreement;
	}

	function mintLeaseNFT(
		uint256 leaseId,
		string memory tokenURI
	) public returns (uint256) {
		ILeaseAgreement leaseAgreement = ILeaseAgreement(leaseAgreementAddress);
		(
			string memory propertyAddress,
			uint256 leaseLength,
			address tenantAddress,
			bool signed
		) = leaseAgreement.getLeaseDetails(leaseId);

		require(
			msg.sender == tenantAddress,
			"You must be the tenant to mint this NFT."
		);
		require(signed, "Lease must be signed before minting."); // Simplified the condition

		_tokenIds.increment();
		uint256 newItemId = _tokenIds.current();
		_mint(msg.sender, newItemId);
		_setTokenURI(newItemId, tokenURI);

		return newItemId;
	}

	// Function to sign a lease
	function signLease(uint256 leaseId) public {
		ILeaseAgreement leaseAgreement = ILeaseAgreement(leaseAgreementAddress);
		leaseAgreement.signLease(leaseId, msg.sender);
	}
}

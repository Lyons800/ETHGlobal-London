// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/ILeaseToken.sol";
import "./lease.sol";

contract LeaseFactory is AccessControl {
	bytes32 public constant LEASE_CREATOR_ROLE =
		keccak256("LEASE_CREATOR_ROLE");

	address[] public deployedLeases;

	event LeaseCreated(
		address indexed leaseAddress,
		address indexed leaseCreator,
		uint256 leaseId
	);

	constructor() {
		_setupRole(LEASE_CREATOR_ROLE, msg.sender);
	}

	function createLease(
		string memory name,
		string memory symbol,
		string memory propertyAddress,
		uint256 leaseLength,
		string memory url
	)
		public
		onlyRole(LEASE_CREATOR_ROLE)
		returns (address leaseAddress, uint256 leaseId)
	{
		LeaseToken newLeaseToken = new LeaseToken(
			name,
			symbol,
			msg.sender,
			propertyAddress,
			leaseLength,
			url
		);
		deployedLeases.push(address(newLeaseToken));
		leaseAddress = address(newLeaseToken);
		leaseId = deployedLeases.length - 1;

		emit LeaseCreated(leaseAddress, msg.sender, leaseId);
		return (leaseAddress, leaseId);
	}

	function getDeployedLeases() public view returns (address[] memory) {
		return deployedLeases;
	}
}

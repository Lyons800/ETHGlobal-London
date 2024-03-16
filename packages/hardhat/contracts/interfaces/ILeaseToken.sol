// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Interface for LeaseToken
interface ILeaseToken {
	// Function to create a lease. This could be part of the LeaseToken contract
	// which might not be directly exposed through this interface if lease creation
	// is handled by a factory contract.
	// function createLease(...) external returns (uint256 leaseId);

	// Function for a tenant to sign a lease
	function signLease(uint256 leaseId) external;

	// Function to get all leases (or lease tokens) and their details
	// Note: Depending on your implementation, you might want to adjust the return types
	// to include specific details about each lease, such as the property address, lease length, etc.
	function getAllLeases()
		external
		view
		returns (address[] memory, string[] memory);
}

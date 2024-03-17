// ILeaseToken.sol

pragma solidity ^0.8.0;

interface ILeaseAgreement {
	function signLease(uint256 leaseId, address tenant) external;
	function getLeaseDetails(
		uint256 leaseId
	)
		external
		view
		returns (
			string memory propertyAddress,
			uint256 leaseLength,
			address tenantAddress,
			bool signed
		);
}

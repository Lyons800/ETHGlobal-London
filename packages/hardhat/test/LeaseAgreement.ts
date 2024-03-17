// import { expect } from "chai";
// import { ethers } from "ethers";

// // Additional import for the mock LeaseNFT contract
// import { deployMockContract } from "@ethereum-waffle/mock-contract";
// import ILeaseNFT from "../artifacts/contracts/interfaces/ILeaseNFT.sol/ILeaseNFT.json"; // Adjust path as necessary

// describe("LeaseAgreement", function () {
//   let LeaseAgreement, leaseAgreement: any, mockLeaseNFT: any;
//   let owner: any, tenant: any, anotherAccount: any;

//   beforeEach(async function () {
//     LeaseAgreement = await ethers.getContractFactory("LeaseAgreement");
//     [owner, tenant, anotherAccount] = await ethers.getSigners();
//     leaseAgreement = await LeaseAgreement.deploy();
//     mockLeaseNFT = await deployMockContract(owner, ILeaseNFT.abi);

//     // Set the mock LeaseNFT address in the LeaseAgreement contract
//     await leaseAgreement.setLeaseNftAddress(mockLeaseNFT.address);
//   });

//   describe("Setting LeaseNFT Address", function () {
//     it("Should set the LeaseNFT address correctly", async function () {
//       expect(await leaseAgreement.leaseNftAddress()).to.equal(mockLeaseNFT.address);
//     });
//   });

//   // Existing tests...

//   describe("Lease Signing with NFT Minting", function () {
//     beforeEach(async function () {
//       await leaseAgreement.connect(owner).createLease("Property Address 1", 30, tenant.address);
//       // Setup the mock to expect the mintLeaseNFT call with specific arguments
//       await mockLeaseNFT.mock.mintLeaseNFT.withArgs(0, tenant.address, "TokenURI").returns();
//     });

//     it("Should mint a LeaseNFT upon signing the lease", async function () {
//       await expect(leaseAgreement.connect(tenant).signLease(0, tenant.address)).to.not.be.reverted;
//       // Verify that the LeaseNFT contract's mintLeaseNFT function was called
//       // Note: This assertion depends on your testing framework capabilities
//     });
//   });

//   // Adjust the "Getting All Leases" test as necessary to match your contract's implementation

//   // Add more tests if you expand your contract (e.g., for cancelling or modifying leases)
// });

import { expect } from "chai";
import { ethers } from "hardhat";

describe("LeaseNFT", function () {
  let LeaseNFT, LeaseAgreement: any;
  let leaseNFT: any, leaseAgreement: any;
  let owner: any, tenant: any;

  beforeEach(async function () {
    [owner, tenant] = await ethers.getSigners();

    // Deploy LeaseAgreement
    LeaseAgreement = await ethers.getContractFactory("LeaseAgreement");
    leaseAgreement = await LeaseAgreement.deploy();

    // Deploy LeaseNFT with the LeaseAgreement address
    LeaseNFT = await ethers.getContractFactory("LeaseNFT");
    leaseNFT = await LeaseNFT.deploy(leaseAgreement.address);

    // Set the LeaseNFT address in the LeaseAgreement contract
    await leaseAgreement.setLeaseNftAddress(leaseNFT.address);
  });

  describe("Minting NFT", function () {
    it("Should allow minting of NFT for a signed lease", async function () {
      // Create a lease and sign it (assuming signLease also mints the NFT)
      await leaseAgreement.connect(owner).createLease("123 Main St", 12, tenant.address);
      await leaseAgreement.connect(tenant).signLease(0, tenant.address);

      // Assuming the NFT ID is 1 for the first minted NFT
      const ownerOfNFT = await leaseNFT.ownerOf(1);
      expect(ownerOfNFT).to.equal(tenant.address);
    });
  });

  // Additional tests can include failure cases, such as trying to mint without signing, or minting by non-tenant.
});

import { expect } from "chai";
import { ethers } from "hardhat";

describe("LeaseAgreement", function () {
  let LeaseAgreement: any;
  let leaseAgreement: any;
  let owner: any;
  let tenant: any;
  let anotherAccount: any;

  beforeEach(async function () {
    LeaseAgreement = await ethers.getContractFactory("LeaseAgreement");
    [owner, tenant, anotherAccount] = await ethers.getSigners();
    leaseAgreement = await LeaseAgreement.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await leaseAgreement.owner()).to.equal(owner.address);
    });
  });

  describe("Lease Creation", function () {
    it("Should create a new lease and emit event", async function () {
      await expect(leaseAgreement.connect(owner).createLease("Property Address 1", 30, tenant.address))
        .to.emit(leaseAgreement, "LeaseCreated")
        .withArgs(0, tenant.address, 30, 0); // Assuming tokenId is 0 for simplicity
      const lease = await leaseAgreement.getLeaseDetails(0);
      expect(lease.propertyAddress).to.equal("Property Address 1");
      expect(lease.leaseLength).to.equal(30);
      expect(lease.tenantAddress).to.equal(tenant.address);
      expect(lease.signed).to.equal(false);
    });
  });

  describe("Lease Signing", function () {
    beforeEach(async function () {
      await leaseAgreement.connect(owner).createLease("Property Address 1", 30, tenant.address);
    });

    it("Should sign a lease", async function () {
      await leaseAgreement.connect(tenant).signLease(0, tenant.address);
      const lease = await leaseAgreement.getLeaseDetails(0);
      expect(lease.signed).to.equal(true);
    });

    it("Should not sign a non-existent lease", async function () {
      await expect(leaseAgreement.connect(tenant).signLease(1, tenant.address)).to.be.revertedWith(
        "Lease does not exist.",
      );
    });

    it("Should not allow non-tenant to sign a lease", async function () {
      await expect(leaseAgreement.connect(anotherAccount).signLease(0, anotherAccount.address)).to.be.revertedWith(
        "Only the designated tenant can sign this lease.",
      );
    });
  });

  describe("Getting All Leases", function () {
    it("Should return all leases correctly", async function () {
      // Create two leases
      await leaseAgreement.connect(owner).createLease("Property Address 1", 30, tenant.address);
      await leaseAgreement.connect(owner).createLease("Property Address 2", 60, anotherAccount.address);

      const allLeases = await leaseAgreement.getAllLeases();
      expect(allLeases[0]).to.have.lengthOf(2); // Tenant Addresses
      expect(allLeases[1]).to.have.lengthOf(2); // Lease Lengths
      expect(allLeases[2][0]).to.equal(false); // Signed Statuses
      expect(allLeases[2][1]).to.equal(false);
    });
  });

  // Add more tests if you expand your contract (e.g., for cancelling or modifying leases)
});

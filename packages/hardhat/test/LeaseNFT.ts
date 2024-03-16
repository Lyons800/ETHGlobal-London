import { expect } from "chai";
import { ethers } from "hardhat";

describe("LeaseAgreement", function () {
  let LeaseAgreement: any;
  let leaseAgreement: any;
  let owner: any;
  let tenant: any;

  beforeEach(async function () {
    LeaseAgreement = await ethers.getContractFactory("LeaseAgreement");
    [owner, tenant] = await ethers.getSigners();
    leaseAgreement = await LeaseAgreement.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await leaseAgreement.owner()).to.equal(owner.address);
    });
  });

  describe("Lease Creation", function () {
    it("Should create a new lease", async function () {
      await leaseAgreement.connect(owner).createLease("Property Address 1", 30, tenant.address);
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
      const [nonTenant] = await ethers.getSigners();
      await expect(leaseAgreement.connect(nonTenant).signLease(0, nonTenant.address)).to.be.revertedWith(
        "Only the designated tenant can sign this lease.",
      );
    });
  });
});

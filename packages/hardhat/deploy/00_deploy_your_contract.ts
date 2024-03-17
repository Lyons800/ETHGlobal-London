import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const { ethers } = hre;

  // Deploy LeaseAgreement first
  const leaseAgreement = await deploy("LeaseAgreement", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  console.log("LeaseAgreement deployed to:", leaseAgreement.address);

  // Then deploy LeaseNFT
  const leaseNFT = await deploy("LeaseNFT", {
    from: deployer,
    log: true,
    autoMine: true,
    args: [leaseAgreement.address], // pass the leaseAgreement address as a constructor argument
  });

  console.log("LeaseNFT deployed to:", leaseNFT.address);

  // Get the LeaseAgreement contract
  const leaseAgreementContract = await ethers.getContractAt("LeaseAgreement", leaseAgreement.address);

  // Set the LeaseNFT address in the LeaseAgreement contract
  await leaseAgreementContract.setLeaseNftAddress(leaseNFT.address);
};

export default deployContracts;
deployContracts.tags = ["LeaseAgreement", "LeaseNFT"];

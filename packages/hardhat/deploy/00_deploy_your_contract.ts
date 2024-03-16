import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy LeaseAgreement first
  const leaseAgreement = await deploy("LeaseAgreement", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  console.log("LeaseAgreement deployed to:", leaseAgreement.address);

  // Then deploy LeaseNFT with the address of LeaseAgreement
  const leaseNFT = await deploy("LeaseNFT", {
    from: deployer,
    args: [leaseAgreement.address], // Passing LeaseAgreement's address to LeaseNFT's constructor
    log: true,
    autoMine: true,
  });

  console.log("LeaseNFT deployed to:", leaseNFT.address);
};

export default deployContracts;
deployContracts.tags = ["LeaseAgreement", "LeaseNFT"];

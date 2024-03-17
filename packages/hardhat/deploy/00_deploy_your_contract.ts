import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const { ethers } = hre;

  // Deploy LeaseAgreement
  const leaseAgreement = await deploy("LeaseAgreement", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  console.log("LeaseAgreement deployed to:", leaseAgreement.address);

  // Define the base URI for the NFT metadata

  // Deploy LeaseNFT with LeaseAgreement address and base URI as arguments
  // Deploy LeaseNFT with LeaseAgreement address as the only argument
  const leaseNFT = await deploy("LeaseNFT", {
    from: deployer,
    args: [leaseAgreement.address], // Only this argument is needed
    log: true,
    autoMine: true,
  });
  console.log("LeaseNFT deployed to:", leaseNFT.address);

  // Get the LeaseAgreement contract instance
  const leaseAgreementContract = await ethers.getContractAt("LeaseAgreement", leaseAgreement.address);

  // Set the LeaseNFT address in the LeaseAgreement contract
  const setNftAddressTx = await leaseAgreementContract.setLeaseNftAddress(leaseNFT.address);
  await setNftAddressTx.wait(); // Wait for the transaction to be mined
  console.log("LeaseNFT address set in LeaseAgreement contract:", leaseNFT.address);
};

export default deployContracts;
deployContracts.tags = ["LeaseAgreement", "LeaseNFT"];

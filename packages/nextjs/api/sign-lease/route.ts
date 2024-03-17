import { ethers } from "ethers";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { address: propertyAddress, leaseLength: leaseLength, tenantAddress: tenantAddress } = req.body; // Assuming name and age map to propertyAddress and leaseLength

    // Initialize ethers provider (using Alchemy, Infura, etc.)
    //@ts-ignore
    const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
    //@ts-ignore

    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // Initialize your contract
    //@ts-ignore
    const leaseNFTContract = new ethers.Contract("0xD5bEE8C11F5cf52FB8a655450792fC1F84b94e4A", LeaseNFTABI, signer);

    try {
      // Call mintLeaseNFT
      const tx = await leaseNFTContract.mintLeaseNFT(
        // Assuming you have a way to generate or specify leaseId
        generateLeaseId(),
        tenantAddress,
        propertyAddress,
        leaseLength,
        "<Token_URI>", // You need to specify how you get or generate this
      );

      await tx.wait(); // Wait for the transaction to be mined

      res.status(200).json({
        status: "success",
        message: "NFT minted successfully",
        transaction: tx,
      });
    } catch (error) {
      console.error("Error minting NFT:", error);
      res.status(500).json({ status: "error", message: "Error minting NFT" });
    }
  } else {
    res.status(405).json({ status: "error", message: "Method Not Allowed" });
  }
}
function generateLeaseId(): any | ethers.Overrides {
  throw new Error("Function not implemented.");
}

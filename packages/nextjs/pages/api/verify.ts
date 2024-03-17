// pages/api/verify.js

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { merkle_root, nullifier_hash, proof, verification_level, action, signal } = req.body;

    try {
      const verifyResponse = await fetch(
        `https://developer.worldcoin.org/api/v1/verify/${process.env.NEXT_PUBLIC_WLD_APP_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            merkle_root,
            nullifier_hash,
            proof,
            verification_level,
            action,
            signal,
          }),
        },
      );

      if (!verifyResponse.ok) {
        throw new Error("Verification failed");
      }

      // Verification succeeded
      const data = await verifyResponse.json();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      return res.status(500).json({ success: false, error: "An unknown error occurred" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

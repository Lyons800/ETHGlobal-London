import dynamic from "next/dynamic";
import { VerificationLevel } from "@worldcoin/idkit";

// Dynamically import the IDKitWidget with SSR disabled
const IDKitWidgetWithNoSSR = dynamic(() => import("@worldcoin/idkit").then(mod => mod.IDKitWidget), { ssr: false });

const VerifyPage = () => {
  // Define the callbacks for handling verification results
  const handleVerify = async (verificationResult: any) => {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verificationResult),
    });

    if (!response.ok) {
      // Handle error
      console.error("Verification failed");
      return;
    }

    const data = await response.json();
    console.log("Backend verification successful:", data);
  };

  const onSuccess = (result: any) => {
    // Handle success (e.g., update UI or redirect)
    console.log("Verification successful:", result);
  };

  return (
    <IDKitWidgetWithNoSSR
      app_id="app_staging_bf4e52a26cc55791ee0e063cac569571"
      action="prove-personhood"
      onSuccess={onSuccess}
      handleVerify={handleVerify}
      verification_level={VerificationLevel.Device}
      // TypeScript bypass using `any`
      {...({
        children: ({ open }: { open: () => void }) => <button onClick={open}>Verify with World ID</button>,
      } as any)}
    />
  );
};

export default VerifyPage;

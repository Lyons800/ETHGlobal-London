// Assuming these types are used within this file or imported for type checking.
export type VerifyReply = {
  code: string;
  detail: string;
};

const verifyEndpoint = `${process.env.NEXT_PUBLIC_WLD_API_BASE_URL}/api/v1/verify/${process.env.NEXT_PUBLIC_WLD_APP_ID}`;

// The function name here corresponds to the HTTP method.
export async function POST(request: { json: () => any }) {
  const body = await request.json();
  console.log("Received request to verify credential:\n", body);

  const reqBody = {
    nullifier_hash: body.nullifier_hash,
    merkle_root: body.merkle_root,
    proof: body.proof,
    verification_level: body.verification_level,
    action: body.action,
    signal: body.signal,
  };

  console.log("Sending request to World ID /verify endpoint:\n", reqBody);

  // Fetch API can be used here as it's globally available in Next.js API routes.
  const verifyRes = await fetch(verifyEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  const wldResponse = await verifyRes.json();

  console.log(`Received ${verifyRes.status} response from World ID /verify endpoint:\n`, wldResponse);

  if (verifyRes.status === 200) {
    console.log("Credential verified! This user's nullifier hash is: ", wldResponse.nullifier_hash);
    return new Response(
      JSON.stringify({
        code: "success",
        detail: "This action verified correctly!",
      }),
      { status: verifyRes.status, headers: { "Content-Type": "application/json" } },
    );
  } else {
    return new Response(JSON.stringify({ code: wldResponse.code, detail: wldResponse.detail }), {
      status: verifyRes.status,
      headers: { "Content-Type": "application/json" },
    });
  }
}

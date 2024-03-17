export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const data = req.body; // Extracting data from the request body

      console.log("Received form data:", data); // Log the received data for demonstration purposes

      // Respond with a JSON object confirming receipt of the form data
      res.status(200).json({
        status: "success",
        message: "Form data received successfully",
        receivedData: data,
      });
    } catch (error) {
      console.error("Error processing the request:", error);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  } else {
    // Respond with 405 Method Not Allowed if the request is not a POST
    res.status(405).json({ status: "error", message: "Method Not Allowed" });
  }
}

import { useState } from "react";
import { AddressType } from "~~/types/abitype/abi";

export default function ForumHome({ tenantAddress }: { tenantAddress: AddressType }) {
  const [address, setAddress] = useState("");
  const [leaseLength, setLeaseLength] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const submitData = { address, leaseLength: Number(leaseLength), tenantAddress };

    try {
      const response = await fetch("/api/handleform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Server response:", responseData);
        alert("Form submitted successfully!");
      } else {
        console.error("Failed to submit form.");
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form.");
    }

    setAddress("");
    setLeaseLength("");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-8">
      <h1 className="w-full text-center m-4 font-semibold text-lg">GET & POST Request in NextJS Stable App Router</h1>
      <form className="flex w-full flex-col justify-center items-center" onSubmit={handleSubmit}>
        <div className="flex w-1/2 justify-center items-center gap-4">
          <input
            type="text"
            name="Address"
            placeholder="Enter the address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="border p-2 px-4 rounded outline-none"
          />
          <input
            type="number"
            name="age"
            placeholder="Enter the age"
            value={leaseLength}
            onChange={e => setLeaseLength(e.target.value)}
            className="border p-2 px-4 rounded outline-none"
          />
          <button type="submit" className="border-blue-500 bg-blue-500 text-white p-2 px-4 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

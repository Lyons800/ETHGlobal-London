import type { NextPage } from "next";
import VerifyPage from "~~/components/WorldcoinVerify";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Debug Contracts",
  description: "Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
});

const Debug: NextPage = () => {
  return (
    <>
      <VerifyPage />
    </>
  );
};
export default Debug;

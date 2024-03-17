"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import CreateLeaseForm from "~~/components/CreateLeaseForm";
import { Address } from "~~/components/scaffold-eth";

const CreateLeasePage: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Tenant Ledger</span>

            <CreateLeaseForm />
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
            <div></div>{" "}
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row"></div>
        </div>
      </div>
    </>
  );
};

export default CreateLeasePage;

import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type SetLeaseNftAddressArgs = {
  leaseNftAddress: string;
};

type SetLeaseNftAddressFunctionNames = "setLeaseNftAddress";

export const useSetLeaseNftAddress = () => {
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite<
    // @ts-ignore
    SetLeaseNftAddressFunctionNames,
    SetLeaseNftAddressArgs
  >({
    contractName: "LeaseAgreement",
    functionName: "setLeaseNftAddress",
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt: { blockHash: any }) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const setLeaseNftAddress = (leaseNftAddress: string) => {
    writeAsync({
      //@ts-ignore
      args: [leaseNftAddress],
    }).catch(error => console.error(error));
  };

  return { setLeaseNftAddress, isLoading, isMining };
};

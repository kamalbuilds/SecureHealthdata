import {
  ConnectWallet,
  Web3Button,
  useOwnedNFTs,
  useAddress,
  useContract,
  ThirdwebNftMedia,
  useClaimNFT,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { editionDropAddress } from "../const";
import { useContext, useEffect, useState } from "react";
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  delegateSignAttestation,
  delegateSignRevokeAttestation,
  delegateSignSchema,
} from '@ethsign/sp-sdk';
import { SignProtocolContext } from "../context/SignProtocolContext";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(editionDropAddress);
  const { data, isLoading } = useOwnedNFTs(contract, address);
  const { mutateAsync: claim, isLoading: isClaiming } = useClaimNFT(contract);

  const { setSignClient, SignClient } = useContext(SignProtocolContext);

  const initializeSignClient = () => {
    const client = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.sepolia,
    });
    setSignClient(client);
    console.log("Client", client, address);
  }

  useEffect(() => {

    if (address) {
      initializeSignClient();
    }


  }, [address])

  const createSchema = async () => {
    if (SignClient) {
      const res = await SignClient.createSchema({
        name: "Patient Schema",
        description: 'Details about the patient',
        data: [
          { name: "id", type: "uint256" },
          { name: "name", type: "string" },
          { name: "age", type: "uint256" },
          { name: "gender", type: "string" },
          { name: "height", type: "string" },
          { name: "weight", type: "string" },
          { name: "address", type: "string" },
          { name: "phoneNumber", type: "uint256" },
          { name: "email", type: "string" },
          { name: "registrationDate", type: "string" },
          { name: "doctorId", type: "uint256" },
          { name: "hospitalId", type: "uint256" },

        ]
      }, {
        getTxHash: (txHash: string) => {
          console.log("Transaction hash ", txHash);
        }
      }
      );

      console.log("Res from schema", res);
      // setSchemaId(res.schemaId);
    }

  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Gasless Transactions with <br />
            <span className={styles.gradientText0}>
              <a
                href="https://thirdweb.com/embedded-wallets"
                target="_blank"
                rel="noopener noreferrer"
              >
                Smart & Embedded Wallets.
              </a>
            </span>
          </h1>

          <div className={styles.connect}>

            {address ? (
              <div className={styles.nft}>
                <Web3Button
                  contractAddress={editionDropAddress}
                  action={() =>
                    claim({
                      tokenId: 0,
                      quantity: 1,
                    })
                  }
                >
                  Claim Edition NFT
                </Web3Button>
              </div>
            ) : (
              <p>Please log in with your Google account or email</p>
            )}
            {address && isLoading ? <p>Loading Owned NFTs...</p> : null}
            {address && !isLoading && data && data.length === 0 ? (
              <p>
                {isClaiming
                  ? "Deploying your account and claiming..."
                  : "No NFTs, claim one now!"}
              </p>
            ) : null}
            {data &&
              data?.map((nft) => (
                <div className={styles.container} key={nft.metadata.id}>
                  <ThirdwebNftMedia metadata={nft.metadata} />
                  <p>
                    You own {nft.quantityOwned} {nft.metadata.name}
                  </p>
                </div>
              ))}
          </div>

        </div>
      </div>

      <div onClick={createSchema}>Create Schem</div>
    </main>
  );
};

export default Home;

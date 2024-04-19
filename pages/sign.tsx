import React, { useState } from 'react';
import {
    SignProtocolClient,
    SpMode,
    EvmChains,
    delegateSignAttestation,
    delegateSignRevokeAttestation,
    delegateSignSchema,
} from '@ethsign/sp-sdk';
import { privateKeyToAccount } from 'viem/accounts';
import { useAddress } from '@thirdweb-dev/react';


const Sign = () => {

    const address = useAddress();
    console.log("Window>>>", window.ethereum)

    const [schemaId, setSchemaId] = useState<string>();

    const client = new SignProtocolClient(SpMode.OnChain, {
        chain: EvmChains.sepolia,
        account: address,
    });
    console.log("Client", client, address);


    const createSchema = async () => {
        const res = await client.createSchema({
            name: "SDK Test",
            data: [
                { name: "contractDetails", type: "string" },
                { name: "signer", type: "address" }
            ]
        }, {
            getTxHash: (txHash: string) => {
                console.log("Transaction hash ", txHash);
            }
        }
        );

        console.log("Res from schema", res);
        setSchemaId(res.schemaId);
    }

    const delegateSchema = async () => {
        const info = await delegateSignSchema(
            {
                name: "SDK Test",
                data: [
                    { name: "contractDetails", type: "string" },
                    { name: "signer", type: "address" }
                ],
                registrant: '0xB06572d024CB9c9e3F4938d8bDd6509d935fC37b'
            },
            {
                chain: EvmChains.sepolia,
                delegationAccount: address,
            }
        );

        console.log("Info >>>", info);
    }





    return (
        <div>
            Sign Protocol

            <div onClick={createSchema}>Create Schem</div>
            <div onClick={delegateSchema}>Delegatee Schem</div>
        </div>
    );
};

export default Sign;
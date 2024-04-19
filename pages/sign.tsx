import React, { useEffect, useState } from 'react';
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
    const HospitalSchemaID = '0x39';
    const DoctorSchemaID = '0x3a';
    const AttendantSchemaID = '0x3b';
    const PatientSchemaID = '0x3c';

    const [SignClient, setSignClient] = useState();

    const initializeSignClient = () => {
        const client = new SignProtocolClient(SpMode.OnChain, {
            chain: EvmChains.sepolia,
            account: address
        });
        setSignClient(client);
        console.log("Client", client, address);
    }

    useEffect(() => {
        if (address) {
            console.log("Window>>>", window.ethereum);
            initializeSignClient();
        }

    }, [address])

    const [schemaId, setSchemaId] = useState<string>();

    const createSchema = async () => {
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
        setSchemaId(res.schemaId);
    }

    // const HospitalSchemaId = '0x8'

    const getSchemaDetails = async (id) => {
        if (SignClient) {
            const res = await SignClient.getSchema(id);
            console.log("REsponse", res);
        }

    }



    return (
        <div>
            Sign Protocol

            <div onClick={createSchema}>Create Schem</div>
            <div onClick={() => getSchemaDetails(PatientSchemaID)}>Get Patient Schema</div>
            <div onClick={() => getSchemaDetails(HospitalSchemaID)}>Get Hospital Schema</div>
            <div onClick={() => getSchemaDetails(AttendantSchemaID)}>Get Attendant Schema</div>
            <div onClick={() => getSchemaDetails(DoctorSchemaID)}>Get Doctor Schema</div>
        </div>
    );
};

export default Sign;
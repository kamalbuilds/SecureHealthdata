import { createContext, useContext, useState } from "react";


export const SignProtocolContext = createContext(null);


export const SignProtocolContextProvider = ({ children }) => {

    const [SignClient, setSignClient] = useState();

    const HospitalSchemaID = '0x39';
    const DoctorSchemaID = '0x3a';
    const AttendantSchemaID = '0x3b';
    const PatientSchemaID = '0x3c';




    return (
        <SignProtocolContext.Provider value={{
            SignClient,
            HospitalSchemaID,
            DoctorSchemaID,
            AttendantSchemaID,
            PatientSchemaID,
            setSignClient
        }}>
            {children}
        </SignProtocolContext.Provider>
    )
}


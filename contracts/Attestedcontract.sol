// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ISP } from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import { Attestation } from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import { DataLocation } from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

/**
 * @title Medical System
 * @dev Integrated system to manage hospital, doctor, and patient details on the blockchain with attestation
 */
contract MedicalSystem {
    address private owner;
    ISP private spInstance;
    uint64 private schemaId;

    struct Hospital {
        string name;
        string hospitaladdress;
        string specialization;
    }

    struct Doctor {
        string name;
        string specialization;
        uint256 phoneNumber;
        string doctoraddress;
    }

    struct Patient {
        string name;
        uint256 age;
        string gender;
        string height;
        uint256 weight;
        string patientaddress;
        uint256 phoneNumber;
        string email;
        uint256 registrationDate;
        uint256 doctorId;
        uint256 hospitalId;
    }

    struct Prescription {
        uint256 doctorId;
        uint256 patientId;
        string medication;
        string dosage;
        uint256 date;
    }

    mapping(uint256 => Hospital) public hospitals;
    mapping(uint256 => Doctor) public doctors;
    mapping(uint256 => Patient) public patients;
    mapping(uint256 => Prescription[]) public prescriptions;

    event HospitalRegistered(uint256 indexed id, string name, string specialization);
    event DoctorRegistered(uint256 indexed id, string name, string specialization);
    event PatientRegistered(uint256 indexed id, string name, uint256 age, string gender);
    event PrescriptionAdded(uint256 indexed patientId, uint256 doctorId, string medication);

    modifier isOwner() {
        require(msg.sender == owner, "Access is not allowed");
        _;
    }

    constructor(address _spInstance) {
        owner = msg.sender;
        spInstance = ISP(_spInstance);
    }
    
    function setSPInstance(address instance) external isOwner {
        spInstance = ISP(instance);
    }

    function setSchemaID(uint64 schemaId_) external isOwner {
        schemaId = schemaId_;
    }


    function registerHospital(uint256 _id, string memory _name, string memory _address, string memory _specialization) public isOwner {
        hospitals[_id] = Hospital(_name, _address, _specialization);
        emit HospitalRegistered(_id, _name, _specialization);
        _createAttestation(abi.encode(_name, _address, _specialization));
    }

    function registerDoctor(uint256 _id, string memory _name, string memory _specialization, uint256 _phoneNumber, string memory _address) public isOwner {
        doctors[_id] = Doctor(_name, _specialization, _phoneNumber, _address);
        emit DoctorRegistered(_id, _name, _specialization);
        _createAttestation(abi.encode(_name, _specialization, _phoneNumber, _address));
    }

    function registerPatient(uint256 _id, string memory _name, uint256 _age, string memory _gender, string memory _height, uint256 _weight, string memory _address, uint256 _phoneNumber, string memory _email, uint256 _registrationDate) public isOwner {
        patients[_id] = Patient(_name, _age, _gender, _height, _weight, _address, _phoneNumber, _email, _registrationDate, 0, 0);
        emit PatientRegistered(_id, _name, _age, _gender);
        _createAttestation(abi.encode(_name, _age, _gender, _height, _weight, _address, _phoneNumber, _email, _registrationDate));
    }

    function addPrescription(uint256 _doctorId, uint256 _patientId, string memory _medication, string memory _dosage) public {
        require(bytes(doctors[_doctorId].name).length > 0, "Doctor does not exist.");
        require(bytes(patients[_patientId].name).length > 0, "Patient must be registered.");
        Prescription memory newPrescription = Prescription({
            doctorId: _doctorId,
            patientId: _patientId,
            medication: _medication,
            dosage: _dosage,
            date: block.timestamp
        });
        prescriptions[_patientId].push(newPrescription);
        emit PrescriptionAdded(_patientId, _doctorId, _medication);
        _createAttestation(abi.encode(_doctorId, _patientId, _medication, _dosage, block.timestamp));
    }

    function _createAttestation(bytes memory data) private {
        Attestation memory attestation = Attestation({
            schemaId: schemaId,
            linkedAttestationId: 0,
            attestTimestamp: uint64(block.timestamp),
            revokeTimestamp: 0,
            attester: address(this),
            validUntil: 0,
            dataLocation: DataLocation.ONCHAIN,
            revoked: false,
            recipients: new bytes[](0), // an array of reciepients
            data: data
        });
        spInstance.attest(attestation, "", "", "");
    }
}

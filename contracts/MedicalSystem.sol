pragma solidity >=0.4.22 <0.7.0;

/**
 * @title Medical System
 * @dev Integrated system to manage hospital, doctor, and patient details on the blockchain
 */
contract MedicalSystem {
    address private owner;

    struct Hospital {
        string name;
        string address;
        string specialization;
    }

    struct Doctor {
        string name;
        string specialization;
        uint256 phoneNumber;
        string address;
    }

    struct Patient {
        string name;
        uint256 age;
        string gender;
        string height;
        uint256 weight;
        string address;
        uint256 phoneNumber;
        string email;
        uint256 registrationDate;
        uint256 doctorId;
        uint256 hospitalId;
    }

    struct Attendant {
        string name;
        string relation;
        uint256 phoneNumber;
    }

    mapping(uint256 => Hospital) hospitals;
    mapping(uint256 => Doctor) doctors;
    mapping(uint256 => Patient) patients;
    mapping(uint256 => Attendant) attendants;

    constructor() public {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Access is not allowed");
        _;
    }

    // Hospital Functions
    function registerHospital(uint256 _id, string memory _name, string memory _address, string memory _specialization) public isOwner {
        hospitals[_id] = Hospital(_name, _address, _specialization);
    }

    function getHospital(uint256 _id) public view returns (string memory, string memory, string memory) {
        Hospital memory h = hospitals[_id];
        return (h.name, h.address, h.specialization);
    }

    // Doctor Functions
    function registerDoctor(uint256 _id, string memory _name, string memory _specialization, uint256 _phoneNumber, string memory _address) public isOwner {
        doctors[_id] = Doctor(_name, _specialization, _phoneNumber, _address);
    }

    function getDoctor(uint256 _id) public view returns (string memory, string memory, uint256, string memory) {
        Doctor memory d = doctors[_id];
        return (d.name, d.specialization, d.phoneNumber, d.address);
    }

    // Patient Functions
    function registerPatient(uint256 _id, string memory _name, uint256 _age, string memory _gender, string memory _height, uint256 _weight, string memory _address, uint256 _phoneNumber, string memory _email, uint256 _registrationDate) public isOwner {
        patients[_id] = Patient(_name, _age, _gender, _height, _weight, _address, _phoneNumber, _email, _registrationDate, 0, 0);
    }

    function getPatient(uint256 _id) public view returns (string memory, uint256, string memory, string memory, uint256, string memory, uint256, string memory, uint256) {
        Patient memory p = patients[_id];
        return (p.name, p.age, p.gender, p.height, p.weight, p.address, p.phoneNumber, p.email, p.registrationDate);
    }

    // Attendant Functions
    function registerAttendant(uint256 _patientId, string memory _name, string memory _relation, uint256 _phoneNumber) public isOwner {
        attendants[_patientId] = Attendant(_name, _relation, _phoneNumber);
    }

    function getAttendant(uint256 _patientId) public view returns (string memory, string memory, uint256) {
        Attendant memory a = attendants[_patientId];
        return (a.name, a.relation, a.phoneNumber);
    }
}

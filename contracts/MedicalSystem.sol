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

    struct Prescription {
    uint256 doctorId;
    uint256 patientId;
    string medication;
    string dosage;
    uint256 date;
}


    mapping(uint256 => Hospital) hospitals;
    mapping(uint256 => Doctor) doctors;
    mapping(uint256 => Patient) patients;
    mapping(uint256 => Attendant) attendants;

    event HospitalRegistered(uint256 indexed id, string name, string specialization);
    event DoctorRegistered(uint256 indexed id, string name, string specialization);
    event PatientRegistered(uint256 indexed id, string name, uint256 age, string gender);
    event AttendantRegistered(uint256 indexed patientId, string name, string relation);
    constructor() public {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Access is not allowed");
        _;
    }


        modifier isDoctor() {
            require(doctors[msg.sender].name != 0, "Only registered doctors are permitted.");
            _;
        }

    // Hospital Functions
    function registerHospital(uint256 _id, string memory _name, string memory _address, string memory _specialization) public isOwner {
        hospitals[_id] = Hospital(_name, _address, _specialization);
        emit HospitalRegistered(_id, _name, _specialization);
    }

    function getHospital(uint256 _id) public view returns (string memory, string memory, string memory) {
        Hospital memory h = hospitals[_id];
        return (h.name, h.address, h.specialization);
    }

    // Doctor Functions
    function registerDoctor(uint256 _id, string memory _name, string memory _specialization, uint256 _phoneNumber, string memory _address) public isOwner {
        doctors[_id] = Doctor(_name, _specialization, _phoneNumber, _address);
        emit DoctorRegistered(_id, _name, _specialization);
    }

    function getDoctor(uint256 _id) public view returns (string memory, string memory, uint256, string memory) {
        Doctor memory d = doctors[_id];
        return (d.name, d.specialization, d.phoneNumber, d.address);
    }

    // Patient Functions
    function registerPatient(uint256 _id, string memory _name, uint256 _age, string memory _gender, string memory _height, uint256 _weight, string memory _address, uint256 _phoneNumber, string memory _email, uint256 _registrationDate) public isOwner {
        patients[_id] = Patient(_name, _age, _gender, _height, _weight, _address, _phoneNumber, _email, _registrationDate, 0, 0);
        emit PatientRegistered(_id, _name, _age, _gender);
    }

    function getPatient(uint256 _id) public view returns (string memory, uint256, string memory, string memory, uint256, string memory, uint256, string memory, uint256) {
        Patient memory p = patients[_id];
        return (p.name, p.age, p.gender, p.height, p.weight, p.address, p.phoneNumber, p.email, p.registrationDate);
    }

    // Attendant Functions
    function registerAttendant(uint256 _patientId, string memory _name, string memory _relation, uint256 _phoneNumber) public isOwner {
        attendants[_patientId] = Attendant(_name, _relation, _phoneNumber);
        emit AttendantRegistered(_patientId, _name, _relation);
    }

    function getAttendant(uint256 _patientId) public view returns (string memory, string memory, uint256) {
        Attendant memory a = attendants[_patientId];
        return (a.name, a.relation, a.phoneNumber);
    }

    function updateHospital(uint256 _id, string memory _name, string memory _address, string memory _specialization) public isOwner {
    require(hospitals[_id].name != 0, "Hospital does not exist.");
    hospitals[_id] = Hospital(_name, _address, _specialization);
    emit HospitalRegistered(_id, _name, _specialization);

function deleteHospital(uint256 _id) public isOwner {
    delete hospitals[_id];
}


    function assignDoctorToPatient(uint256 _patientId, uint256 _doctorId) public isOwner {
    require(doctors[_doctorId].name != 0, "Doctor does not exist.");
    require(patients[_patientId].name != 0, "Patient does not exist.");
    patients[_patientId].doctorId = _doctorId;
}

function assignHospitalToPatient(uint256 _patientId, uint256 _hospitalId) public isOwner {
    require(hospitals[_hospitalId].name != 0, "Hospital does not exist.");
    patients[_patientId].hospitalId = _hospitalId;
}

// Add a new prescription
function addPrescription(uint256 _patientId, string memory _medication, string memory _dosage) public isDoctor {
    require(patients[_patientId].name != 0, "Patient must be registered.");
    uint256 doctorId = // retrieve doctor ID from msg.sender or another state variable
    Prescription memory newPrescription = Prescription({
        doctorId: doctorId,
        patientId: _patientId,
        medication: _medication,
        dosage: _dosage,
        date: block.timestamp
    });
    prescriptions[_patientId].push(newPrescription);
    emit PrescriptionAdded(_patientId, doctorId, _medication);
}

// Retrieve prescriptions for a patient
function getPrescriptions(uint256 _patientId) public view returns (Prescription[] memory) {
    return prescriptions[_patientId];
}




}

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.7.0;

/**
 * @title Medical Record Tokenization
 * @dev Implementation of medical records as ERC721 tokens for unique identification and management.
 */
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract BodyExamine is ERC721 {
    mapping(uint256 => TestResults) private _testResults;
    mapping(uint256 => GeneralExamination) private _generalExaminations;
    mapping(uint256 => SystemicExamination) private _systemicExaminations;
    mapping(uint256 => RecordUpdate) private _recordUpdates;

    struct TestResults {
        string bloodTest;
        string urineTest;
        string ecg;
        string mriScan;
        string ctScan;
        string xray;
        string labTest;
    }

    struct GeneralExamination {
        string built;
        string nourishment;
        string eyes;
        string tongue;
        uint64 pulse;
        uint64 temperature;
        string bloodPressure;
        uint64 respiratoryRate;
    }

    struct SystemicExamination {
        string cvs; // Cardiovascular System
        string cns; // Central Nervous System
        string rs;  // Respiratory System
        string abdomen;
    }

    struct RecordUpdate {
        string previousUpdateDate;
    }

    address private _owner;

    constructor() ERC721("MedicalCoin", "MEDC") public {
        _owner = 0x34d8bC94989BbE14BCfd98E0550201ba4970B776; // Example Doctor Address
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    function mintMedicalRecord(uint256 patientId) public onlyOwner {
        _mint(msg.sender, patientId);
    }

    function storeTestResults(
        uint256 patientId,
        string memory bloodTest,
        string memory urineTest,
        string memory ecg,
        string memory mriScan,
        string memory ctScan,
        string memory xray,
        string memory labTest
    ) public onlyOwner {
        TestResults memory newTestResults = TestResults({
            bloodTest: bloodTest,
            urineTest: urineTest,
            ecg: ecg,
            mriScan: mriScan,
            ctScan: ctScan,
            xray: xray,
            labTest: labTest
        });
        _testResults[patientId] = newTestResults;
    }

    function getTestResults(uint256 patientId) public view returns (TestResults memory) {
        return _testResults[patientId];
    }

    function storeGeneralExamination(uint256 patientId, GeneralExamination memory examination) public onlyOwner {
        _generalExaminations[patientId] = examination;
    }

    function getGeneralExamination(uint256 patientId) public view returns (GeneralExamination memory) {
        return _generalExaminations[patientId];
    }

    function storeSystemicExamination(uint256 patientId, SystemicExamination memory examination) public onlyOwner {
        _systemicExaminations[patientId] = examination;
    }

    function getSystemicExamination(uint256 patientId) public view returns (SystemicExamination memory) {
        return _systemicExaminations[patientId];
    }

    function storeRecordUpdate(uint256 patientId, string memory previousUpdateDate) public onlyOwner {
        RecordUpdate memory newRecordUpdate = RecordUpdate({
            previousUpdateDate: previousUpdateDate
        });
        _recordUpdates[patientId] = newRecordUpdate;
    }

    function getRecordUpdate(uint256 patientId) public view returns (string memory) {
        return _recordUpdates[patientId].previousUpdateDate;
    }
}

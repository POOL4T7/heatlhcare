// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

contract HealthCare {
    address private owner;
    uint private reportCount = 0;

    struct Hospital {
        address id;
        string name;
        string email;
        uint phone;
        string description;
        string location;
    }

    struct Doctor {
        address id;
        string name;
        string email;
        string gender;
        uint256 phone;
        string type_name;
        string location;
        address hospital;
        address[] patient_list;
    }

    struct Patient {
        address id;
        string name;
        uint phone;
        string email;
        string gender;
        string dob;
        string bloodGroup;
        string permanentAddress;
        address[] doctor_list;
        // uint score;
        // Analysis[] history;
    }

    struct Analysis {
        uint256 ID;
        string testName;
        address hospital;
        address doctor;
        uint256 price;
        string date;
        uint256 value;
        uint256 min;
        uint256 max;
        uint256 weight;
        address[] signatures;
    }

    mapping(address => Hospital) private hospitals;
    mapping(address => Doctor) private doctors;
    mapping(address => Patient) private patients;
    mapping(address => Analysis[]) reports;

    mapping(address => mapping(address => uint256)) private doctorToPatient; // doctors to patient list
    mapping(address => mapping(address => uint256)) private patientToDoctor;

    constructor() {
        owner = msg.sender;
    }

    modifier checkDoctor(address id) {
        Doctor memory d = doctors[id];
        require(d.id > address(0x0), "Doctor Not Found or Access Denied");
        _;
    }

    modifier checkPatient(address id) {
        Patient storage p = patients[id];
        require(p.id > address(0x0), "Patient Not Found or Access Denied");
        _;
    }

    modifier checkHospital(address id) {
        Hospital storage h = hospitals[id];
        require(h.id > address(0x0), "Hospital Not Found or Access Denied");
        _;
    }

    modifier checkDoctorOrHospital(address id) {
        Hospital memory h = hospitals[msg.sender];
        Doctor memory d = doctors[msg.sender];
        require(
            h.id > address(0x0) || d.id > address(0x0),
            "User not found or Access Denied"
        );
        _;
    }

    event Signup(address add, string name, string role);

    // -------------------------------------------------------------------------------
    //  Patient
    // -------------------------------------------------------------------------------

    function addPatient(
        string memory _name,
        uint _phone,
        string memory _email,
        string memory _dob,
        string memory _bloodGroup,
        string memory _permanentAddress,
        string memory _gender
    ) public {
        Patient storage p = patients[msg.sender];
        Doctor storage d = doctors[msg.sender];
        Hospital memory h = hospitals[msg.sender];
        require(!(p.id > address(0x0)), "Account already present");
        require(!(d.id > address(0x0)), "Account already present");
        require(!(h.id > address(0x0)), "Account already present");
        require(keccak256(abi.encodePacked(_name)) != keccak256(""), "");
        patients[msg.sender] = Patient({
            id: msg.sender,
            name: _name,
            phone: _phone,
            email: _email,
            dob: _dob,
            bloodGroup: _bloodGroup,
            permanentAddress: _permanentAddress,
            doctor_list: new address[](0),
            gender: _gender
        });
        emit Signup(msg.sender, _name, "Patient");
    }

    function getPatientProfile()
        public
        view
        checkPatient(msg.sender)
        returns (
            string memory name,
            string memory email,
            string memory dob,
            string memory bloodGroup,
            string memory permanentAddress,
            Analysis[] memory history
        )
    {
        Patient memory p = patients[msg.sender];
        return (
            p.name,
            p.email,
            p.dob,
            p.bloodGroup,
            p.permanentAddress,
            reports[msg.sender]
        );
    }

    function grantAccessToDoctor(
        address doctor_id
    ) public checkPatient(msg.sender) checkDoctor(doctor_id) {
        Patient storage p = patients[msg.sender];
        Doctor storage d = doctors[doctor_id];
        require(
            patientToDoctor[msg.sender][doctor_id] < 1,
            "This Doctor is already assigned"
        );

        p.doctor_list.push(doctor_id);
        patientToDoctor[msg.sender][doctor_id]++;
        doctorToPatient[doctor_id][msg.sender]++;
        d.patient_list.push(msg.sender);
    }

    // function removeAccessFromDoctor(
    //     address doctor_id
    // ) public checkPatient(msg.sender) checkDoctor(doctor_id) {
    //     require(
    //         patientToDoctor[msg.sender][doctor_id] > 0,
    //         "This Doctor is not assigned"
    //     );
    //     patientToDoctor[msg.sender][doctor_id] = 0;
    //     doctorToPatient[doctor_id][msg.sender] = 0;
    // }

    // -------------------------------------------------------------------------------
    //  Doctor
    // -------------------------------------------------------------------------------

    function addDoctor(
        string memory _name,
        string memory email,
        uint phone,
        string memory _type_name,
        string memory _location,
        string memory _gender
    ) public {
        Patient storage p = patients[msg.sender];
        Doctor storage d = doctors[msg.sender];
        Hospital memory h = hospitals[msg.sender];
        require(!(p.id > address(0x0)), "Account already present");
        require(!(d.id > address(0x0)), "Account already present");
        require(!(h.id > address(0x0)), "Account already present");
        require(keccak256(abi.encodePacked(_name)) != keccak256(""), "");
        doctors[msg.sender] = Doctor({
            id: msg.sender,
            name: _name,
            email: email,
            phone: phone,
            type_name: _type_name,
            location: _location,
            hospital: address(0x0),
            patient_list: new address[](0),
            gender: _gender
        });
        emit Signup(msg.sender, _name, "Doctor");
    }

    function getDoctorProfile()
        public
        view
        checkDoctor(msg.sender)
        returns (Doctor memory)
    {
        return doctors[msg.sender];
    }

    // function addAnalysis(
    //     address pat,
    //     string memory testName,
    //     address hospital,
    //     uint price,
    //     string memory date,
    //     uint value,
    //     uint min,
    //     uint max,
    //     uint weight
    // ) public checkDoctor(msg.sender) {
    //     Doctor memory d = doctors[msg.sender];
    //     require(d.hospital == hospital, "Invalid Hospital");
    //     require(
    //         patientToDoctor[pat][msg.sender] > 0,
    //         "Doctor is not assigned to Patient"
    //     );
    //     address[] memory sign = new address[](1);
    //     sign[0] = msg.sender;
    //     reports[pat].push(
    //         Analysis({
    //             ID: reportCount,
    //             testName: testName,
    //             hospital: hospital,
    //             doctor: msg.sender,
    //             price: price,
    //             date: date,
    //             value: value,
    //             min: min,
    //             max: max,
    //             weight: weight,
    //             signatures: sign
    //         })
    //     );
    //     reportCount++;
    // }

    // -------------------------------------------------------------------------------
    //  Hospital
    // -------------------------------------------------------------------------------

    function addHospital(
        string memory name,
        string memory descr,
        string memory location,
        uint _phone,
        string memory _email
    ) public {
        Patient storage p = patients[msg.sender];
        Doctor storage d = doctors[msg.sender];
        Hospital memory h = hospitals[msg.sender];
        require(!(p.id > address(0x0)), "Account already present");
        require(!(d.id > address(0x0)), "Account already present");
        require(!(h.id > address(0x0)), "Account already present");
        require(keccak256(abi.encodePacked(name)) != keccak256(""), "");
        hospitals[msg.sender] = Hospital(
            msg.sender,
            name,
            _email,
            _phone,
            descr,
            location
        );
        emit Signup(msg.sender, name, "Hospital");
    }

    function assignHostpitalToDoctor(
        address doc
    ) public checkHospital(msg.sender) checkDoctor(doc) {
        doctors[doc].hospital = msg.sender;
    }

    // -------------------------------------------------------------------------------
    //  Public functions
    // -------------------------------------------------------------------------------

    function Login()
        public
        view
        returns (
            address id,
            string memory name,
            string memory email,
            string memory role
        )
    {
        Patient memory p = patients[msg.sender];
        Hospital memory h = hospitals[msg.sender];
        Doctor memory d = doctors[msg.sender];
        if (p.id > address(0x0)) {
            return (msg.sender, p.name, p.email, "Patient");
        } else if (h.id > address(0x0)) {
            return (msg.sender, h.name, h.email, "Hospital");
        } else if (d.id > (address(0x0))) {
            return (msg.sender, d.name, d.email, "Doctor");
        }
        revert("NO Account found");
    }
}

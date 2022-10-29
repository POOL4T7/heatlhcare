// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Sample {
    enum Level {
        High,
        Healthy,
        Low
    }
    enum Role {
        Owner,
        Admin,
        Doctor,
        Patient
    }
    enum Designation {
        doctor,
        patient,
        admin
    }
    struct Location {
        string faltNumber;
    }
    struct Date {
        uint256 year;
        uint256 month;
        uint256 day;
    }
    struct Hospital {
        string name;
        string description;
        string location;
    }
    struct Doctor {
        string name;
        Designation type_name;
        string location;
        address hostpital;
    }

    struct Patient {
        string name;
        string contact;
        string email;
        Analysis[] history;
    }
    struct Analysis {
        string name;
        address doctor;
        Date date;
        uint256 min;
        uint256 max;
        uint256 value;
        uint256 weight;
    }

    mapping(address => Hospital) hospitals;
    mapping(address => Doctor) doctors;

    function addHospital(
        string memory name,
        string memory descr,
        string memory location
    ) public {
        hospitals[address(this)] = Hospital(name, descr, location);
    }

    function addDoctor(
        string memory name,
        string memory location,
        address hospital,
        Designation typ
    ) public {
        doctors[address(this)] = Doctor(name, typ, location, hospital);
    }
}

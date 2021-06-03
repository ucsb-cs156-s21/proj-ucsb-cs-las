const tutorAssignmentFixtures = {
    Scott_Chow_CMPSC_156_S20: {
        id: 1,
        course: {
            name: "CMPSC 156",
            id: 1,
            quarter: "20202",
            instructorFirstName: "Phill",
            instructorLastName: "Conrad",
            instructorEmail: "phtcon@ucsb.edu",
        },
        tutor: {
            email: "scottpchow@ucsb.edu",
            firstName: "Scott",
            id: 1,
            lastName: "Chow"
        },
        assignmentType: "TA",
    },
    Alex_Gerber_PSTAT_120A_M20: {
        id: 2,
        course: {
            name: "PSTAT 120A",
            id: 2,
            quarter: "20203",
            instructorFirstName: "Uma",
            instructorLastName: "Ravat",
            instructorEmail: "umaravat@ucsb.edu",
        },
        tutor: {
            email: "alexgerber@ucsb.edu",
            firstName: "Alex",
            id: 2,
            lastName: "Gerber"
        },
        assignmentType: "TA",
    }
};

export default tutorAssignmentFixtures;
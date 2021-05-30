const officeHoursFixtures = {
    oneOfficeHour :  {
        "id": 104,
        "tutorAssignment": {
          "id": 103,
          "course": {
            "id": 2,
            "name": "CMPSC 156",
            "quarter": "20211",
            "instructorFirstName": "Phillip",
            "instructorLastName": "Conrad",
            "instructorEmail": "phtcon@ucsb.edu"
          },
          "tutor": {
            "id": 33,
            "firstName": "Mara",
            "lastName": "Downing",
            "email": "maradowning@ucsb.edu"
          },
          "assignmentType": "TA"
        },
        "dayOfWeek": "Monday",
        "startTime": "12:00PM",
        "endTime": "1:00PM",
        "zoomRoomLink": "https://ucsb.zoom.us/j/XXXXXXXXX",
        "notes": "Test OH"
      },
      threeOfficeHours: [
        {
          "id": 114,
          "tutorAssignment": {
            "id": 110,
            "course": {
              "id": 109,
              "name": "CMPSC 156",
              "quarter": "20212",
              "instructorFirstName": "Phill",
              "instructorLastName": "Conrad",
              "instructorEmail": "phtcon@ucsb.edu"
            },
            "tutor": {
              "id": 4,
              "firstName": "Mara",
              "lastName": "Downing",
              "email": "maradowning@ucsb.edu"
            },
            "assignmentType": "TA"
          },
          "dayOfWeek": "Tuesday",
          "startTime": "2:30PM",
          "endTime": "4:30PM",
          "zoomRoomLink": "",
          "notes": ""
        },
        {
          "id": 115,
          "tutorAssignment": {
            "id": 111,
            "course": {
              "id": 109,
              "name": "CMPSC 156",
              "quarter": "20212",
              "instructorFirstName": "Phill",
              "instructorLastName": "Conrad",
              "instructorEmail": "phtcon@ucsb.edu"
            },
            "tutor": {
              "id": 5,
              "firstName": "Andrew",
              "lastName": "Lu",
              "email": "alu@ucsb.edu"
            },
            "assignmentType": "LA"
          },
          "dayOfWeek": "Thursday",
          "startTime": "4:00PM",
          "endTime": "6:00PM",
          "zoomRoomLink": "",
          "notes": ""
        },
        {
          "id": 116,
          "tutorAssignment": {
            "id": 113,
            "course": {
              "id": 109,
              "name": "CMPSC 156",
              "quarter": "20212",
              "instructorFirstName": "Phill",
              "instructorLastName": "Conrad",
              "instructorEmail": "phtcon@ucsb.edu"
            },
            "tutor": {
              "id": 112,
              "firstName": "Calvin",
              "lastName": "Jenkins",
              "email": "calvinjenkins@ucsb.edu"
            },
            "assignmentType": "190J"
          },
          "dayOfWeek": "Tuesday",
          "startTime": "11:00AM",
          "endTime": "1:00PM",
          "zoomRoomLink": "",
          "notes": ""
        }
      ]
};

export default officeHoursFixtures;
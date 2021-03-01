export const oneW21Course = [
    {
        id: 1,
        name: "CMPSC 156",
        quarter: "20211",
        instructorFirstName: "Phillip",
        instructorLastName: "Conrad",
        instructorEmail: "phtcon@ucsb.edu"
    }
];

export const threeS21Courses = [
    {
        id: 2,
        name: "CMPSC 156",
        quarter: "20212",
        instructorFirstName: "Phillip",
        instructorLastName: "Conrad",
        instructorEmail: "phtcon@ucsb.edu"
    },
    {
        id: 26,
        name: "CMPSC 130A",
        quarter: "20212",
        instructorFirstName: "Daniel",
        instructorLastName: "Lokhstanov",
        instructorEmail: "daniello@ucsb.edu"
    },
    {
        id: 29,
        name: "CMPSC 130B",
        quarter: "20212",
        instructorFirstName: "Ambuj",
        instructorLastName: "Singh",
        instructorEmail: "ambuj@ucsb.edu"
    }
];

export const manyCourses = [
    ...oneW21Course,
    ...threeS21Courses
]

export const quarterToCourses = {
    "20211" : [ ...oneW21Course ],
    "20212" : [ ...threeS21Courses ]
}

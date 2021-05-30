function checkCourseQuarter(quarter) {
    if (quarter.length !== 3) {
        return false;
    }
    const quarterType = quarter.charAt(0);
    const quarterYear = quarter.substring(1, quarter.length);
    if (quarterType !== "F" && quarterType !== "W" && quarterType !== "S" && quarterType !== "M") {
        return false;
    }
    if (isNaN(quarterYear)) {
        return false;
    }
    return true;
}

function checkEmail(email) {
    return email.endsWith("@ucsb.edu");
}

function checkFilled(input) {
    return input ? true : false;
}

export { checkCourseQuarter, checkEmail, checkFilled };
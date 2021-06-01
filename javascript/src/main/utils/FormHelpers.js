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

function checkTime(time) {
    time = time.trim();
    const regex = /^((1[012])|[1-9]):[0-5][0-9]([ap]m|([AP]M))$/
    return regex.test(time); 
}

function checkFilled(input) {
    return input ? true : false;
}

const formatQuarter = (quarter) => {
    let quarterNum = "1";
    if(quarter.substr(0, 1)==="S"){
        quarterNum =  "2";
    }
    else if(quarter.substr(0, 1)==="M"){
        quarterNum =  "3";
    }
    else if(quarter.substr(0, 1)==="F"){
        quarterNum =  "4";
    }
  
    let formattedQuarter = "20" + quarter.substr(1, 2) + quarterNum;
    return formattedQuarter;
  }

export { checkCourseQuarter, checkTime, checkFilled, formatQuarter };
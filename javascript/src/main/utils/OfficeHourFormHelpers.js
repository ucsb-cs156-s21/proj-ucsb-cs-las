function checkTime(time) {
    time = time.trim();

    if (time.length != 6 && time.length != 7) {
        return false; 
    }

    const colonIdx = time.indexOf(":") ; 
    if (colonIdx == -1) {
        return false; 
    }

    var minutes = time.substring(colonIdx + 1, colonIdx + 3); 
    if (isNaN(minutes)) {
        return false; 
    }
    if (isNaN(parseInt(minutes[0])) || parseInt(minutes[0] > 5)) {
        return false; 
    }
    if (isNaN(parseInt(minutes[1]))) {
        return false; 
    }
    
    var hour = time.substring(0, colonIdx);  
    if (isNaN(hour)) {
        return false; 
    }
    
    if (colonIdx == 2) {
        if (isNaN(parseInt(hour[0])) || parseInt(hour[0] != 1)) {
            return false; 
        }
    
        if (isNaN(parseInt(hour[1])) || parseInt(hour[1] > 2)) {
            return false; 
        }
    }
    else if (colonIdx == 1) {
        if (isNaN(parseInt(hour[0])) || parseInt(hour[0] == 0 )) {
            return false; 
        } 
    }
    else {
        return false; 
    }
    
    var period = time.substring(colonIdx + 3, time.length).toUpperCase(); 
    if (period != "AM" && period != "PM") {
        return false; 
    }

    return true; 
}

function checkFilled(input) {
    return input ? true : false;
}

export { checkTime, checkFilled };
// Takes a time in a format like XX:XXAM and converts it to HH:MM:SS format
// to be turned into a LocalTime.
const formatTimeToLocalTime = (time) => {
    const regex = /^(?<hour>1[012]|[1-9]):(?<minutes>[0-5][0-9])(?<period>[ap]m|[AP]M)$/
    let { hour, minutes, period } = time.match(regex).groups;

    let hourInt = parseInt(hour);
   
    if (period === "AM" && hourInt === 12) {
        hourInt = 0;
    }    

    if (period === "PM" && hourInt !== 12) {
        hourInt += 12;
    }

    let formattedTime = "";
    formattedTime += String(hourInt).padStart(2, '0');
    formattedTime += ':' + minutes + ':00';

    return formattedTime;
}

export { formatTimeToLocalTime };
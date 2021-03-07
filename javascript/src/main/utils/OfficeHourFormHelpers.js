function checkTime(time) {
    time = time.trim();
    const regex = /^((1[012])|[1-9]):[0-5][0-9]([ap]m|([AP]M))$/
    return regex.test(time); 
}

function checkZoomRoomLink(zoomRoomLink) {
    return zoomRoomLink.startsWith("https://ucsb.zoom.us")
}

function checkFilled(input) {
    return input ? true : false;
}

export { checkTime, checkZoomRoomLink, checkFilled };
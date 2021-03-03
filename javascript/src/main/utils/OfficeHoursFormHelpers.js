function checkZoomRoomLink(zoomRoomLink) {
    return zoomRoomLink.startsWith("https://ucsb.zoom.us");
}

function checkFilled(input) {
    return input ? true : false;
}

export {checkZoomLink, checkFilled };
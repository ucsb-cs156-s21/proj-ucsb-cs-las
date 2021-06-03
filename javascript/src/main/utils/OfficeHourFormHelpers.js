function checkZoomRoomLink(zoomRoomLink) {
    return zoomRoomLink.startsWith("https://ucsb.zoom.us") || zoomRoomLink === ""
}


export { checkZoomRoomLink };
const quarters = [
    "WINTER",
    "SPRING",
    "SUMMER",
    "FALL"
];

const fromFormat = (format) => {
    try {
        return `${quarters[parseInt(format.charAt(4)) - 1][0]}${format.substring(2, 4)}`;
    } catch (e) {
        return '';
    }
};

export default fromFormat;

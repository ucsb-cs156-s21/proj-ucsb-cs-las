import React, {useState} from "react";
import { Button } from "react-bootstrap";

const DarkModeButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    React.useEffect(() => {
        if(darkMode)
            document.body.classList.add("dark");
        else
            document.body.classList.remove("dark");
    }, [darkMode]);

    return (
        <Button onClick={() => setDarkMode(!darkMode)} variant="primary">
            Dark Mode
        </Button>
    );
};

export default DarkModeButton;

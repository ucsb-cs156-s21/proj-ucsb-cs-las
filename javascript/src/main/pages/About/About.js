  
import React from "react";
import { Jumbotron } from "react-bootstrap";
const About = () => {
  return (
    <Jumbotron>
      <h1>About Us</h1>
      <div className="text-left">
        <h2>Purpose</h2>
        <p>
          This app was designed as a way to manage the assignment of Computer Science LAs and TAs to available slots during open lab hours.
          In-person lab hours and office hours have been cancelled due to the ongoing pandemic and will take place on zoom until further notice.
        </p>
        <h3>Features</h3>
        <li>
          Users can login to the app with their @ucsb.edu gmail account
        </li>
        <li>
          Instructors have access to update information about their courses
        </li>
        <li>
           LAs and TAs have access to update their own office hours
        </li>
        <li>
          Students may view available lab hours as well as office hours for each CS course
        </li>
        <li>
          Maintains database of all current and past students that have served as LAs 
        </li>
        <p></p>
        <h4>Team</h4>
        <p>
          This app was designed as a project course for CS156 students to learn
          how to use React with Spring in order to create a functional web application.
          Check out the source code here on {" "}
            <a href="https://github.com/ucsb-cs156-w21/proj-ucsb-cs-las">
              Github
            </a>{"."}
        </p>
      </div>
    </Jumbotron>
  );
};

export default About;
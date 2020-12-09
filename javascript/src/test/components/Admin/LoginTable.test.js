import React from "react";
import { render } from "@testing-library/react";
import LoginTable from "main/components/Admin/LoginTable";

describe("LoginTable tests", () => {

    test("renders without crashing on empty list", () => {
        render(<LoginTable loginTable={[]} />);
    });


  test("renders without crashing on non empty list", () => {

    const loginTable = [
        {
            "timestamp": "7:00",
            "email": "matthew_wong@ucsb.edu",
            "firstName": "matthew",
            "lastName": "wong"
        }
    ];

    render(<LoginTable loginTable={loginTable}/>);
  });

});

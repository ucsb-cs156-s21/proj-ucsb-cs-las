import React from "react";
import {render} from "@testing-library/react";
import OfficeHoursSelector from "main/components/OfficeHours/OfficeHoursSelector";
import officeHoursFixtures from 'fixtures/officeHoursFixtures';
import userEvent from "@testing-library/user-event";

describe("OfficeHourSelector", () => {
  it("renders a usable office hour selector", async () => {
    const onChange = jest.fn();
    render(
      <OfficeHoursSelector
        officeHours={[officeHoursFixtures.oneOfficeHour]}
        onChange={onChange}
      />
    );
    });

    it("allows us to select an office hour", async () => {
        const onChange = jest.fn();
        const {getByText} = render(
          <OfficeHoursSelector
            officeHours={officeHoursFixtures.threeOfficeHours}
            onChange={onChange}
          />);
        userEvent.click(getByText("CMPSC 156 Spring 2021 Mara Downing Tuesday 2:30PM-4:30PM"));
        userEvent.click(getByText("CMPSC 156 Spring 2021 Calvin Jenkins Tuesday 11:00AM-1:00PM"));
    });
});

import React from "react";
import { render } from "@testing-library/react";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import userEvent from "@testing-library/user-event";
import RoomSlotCSVButton from "main/components/RoomSlot/RoomSlotCSVButton";

jest.mock("swr");
jest.mock("@auth0/auth0-react");
jest.mock("main/utils/fetch");

describe("Room Slot CSV Upload test", () => {
    const user = {
        name: "test user",
    };
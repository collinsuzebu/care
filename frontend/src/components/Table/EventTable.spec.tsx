import React from "react";
import EventTable from "./EventTable";
import { render, screen } from "@testing-library/react";
import { withReduxChakra } from "../../test-utils";

describe("EventTable", () => {
  const data = [
    {
      id: "id_1",
      event_type: "mood_observation",
      caregiver_id: "care_1",
      timestamp: "2019-04-25T16:50:07.730Z",
    },
    {
      id: "id_2",
      event_type: "fluid_intake",
      caregiver_id: "care_2",
      timestamp: "2020-04-25T16:50:07.730Z",
    },
  ];

  it("should render data in EventTable", async () => {
    const { container } = render(withReduxChakra(<EventTable data={data} />));

    const eventData = screen.queryByText("mood_observation");
    expect(eventData).toBeInTheDocument();

    const careGiverData = screen.queryByText("care_2");
    expect(careGiverData).toBeInTheDocument();

    const allEventType = container.getElementsByClassName("event-type").length;
    expect(allEventType).toBe(2);
  });
});

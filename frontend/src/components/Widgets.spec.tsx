import React from "react";
import Card from "./Widgets";
import { render, screen } from "@testing-library/react";
import { withReduxChakra } from "../test-utils";

describe("Card Widget", () => {
  const heading = "Card Heading";
  const subheading = "Card Subheading";
  const data = [
    { event_type: "mood_observation", event_count: 20 },
    { event_type: "fluid_intake", event_count: 10 },
  ];

  it("should render items in Card Widget", async () => {
    render(
      withReduxChakra(
        <Card heading={heading} subheading={subheading} data={data} />,
      ),
    );

    const cardHeader = screen.queryByText(heading);
    expect(cardHeader).toBeInTheDocument();

    const cardSubheading = screen.queryByText(subheading);
    expect(cardSubheading).toBeInTheDocument();
  });

  it("should display items in Card Widget with correct styling", async () => {
    const { container } = render(
      withReduxChakra(
        <Card heading={heading} subheading={subheading} data={data} />,
      ),
    );
    expect(container.getElementsByClassName("chakra-badge").length).toBe(2);
  });
});

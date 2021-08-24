import React from "react";
import EventSection from "./EventSection";
import { render, screen } from "@testing-library/react";
import { withReduxChakra } from "../../test-utils";

describe("EventSection", () => {
  const recipientId = "recipient_id_321";

  it("should render items in EventSection", async () => {
    render(withReduxChakra(<EventSection recipientId={recipientId} />));

    const tableHeader = screen.queryByText("Most Recent Events");
    expect(tableHeader).toBeInTheDocument();

    const tableComponent = await screen.findByRole("table");
    expect(tableComponent).toBeInTheDocument();
  });
});

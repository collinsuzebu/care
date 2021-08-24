import React from "react";
import InfoModal from "./InfoModal";
import { render, screen } from "@testing-library/react";
import { withReduxChakra } from "../../test-utils";

describe("InfoModal", () => {
  const data = {
    id: "id_1",
    payload: '{"id":"id_1", "event_type":"physical_health_observation"}',
    caregiver_id: "care_1",
    timestamp: "2019-04-25T16:50:07.730Z",
  };

  it("should not render InfoModal", async () => {
    render(
      withReduxChakra(
        <InfoModal data={data} isOpen={false} onClose={() => {}} />,
      ),
    );

    const id = screen.queryByText("id_1");
    expect(id).toBeNull();
  });

  it("should render InfoModal", async () => {
    render(
      withReduxChakra(
        <InfoModal data={data} isOpen={true} onClose={() => {}} />,
      ),
    );

    expect(screen.queryAllByText("id_1")).toHaveLength(2);
    expect(screen.queryByText("care_1")).toBeInTheDocument();
    expect(screen.queryByText("2019-04-25T16:50:07.730Z")).toBeInTheDocument();
  });

  it("should render close InfoModal", async () => {
    render(
      withReduxChakra(
        <InfoModal data={data} isOpen={true} onClose={() => {}} />,
      ),
    );

    const closeButton = await screen.getByText("Close");
    expect(closeButton).toBeInTheDocument();
  });
});

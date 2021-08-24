import React from "react";
import Dashboard from "./Dashboard";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withReduxChakra } from "../../test-utils";
import Chart from "../Chart/ChartHook";

/* 
Amcharts does not support testing with jest. 
Already half way into the project before finding out 
https://www.amcharts.com/docs/v4/getting-started/using-typescript-or-es6/#Using_amCharts_with_Jest

*/
jest.mock("../Chart/ChartHook", () => () => <div />);

var globalRef: any = global;

describe("Dashboard", () => {
  const store = {
    recipients: {
      data: [
        { id: "recipient_id_3", name: "recipient_name_3" },
        { id: "recipient_id_4", name: "recipient_name_4" },
      ],
    },
  };

  describe("Select Care Recipients", () => {
    it("should render items in Dashboard", async () => {
      const { container } = render(withReduxChakra(<Dashboard />, store));
      expect(container).toBeDefined();
    });

    it("should render dropdown menu to select care recipients", async () => {
      render(withReduxChakra(<Dashboard />, store));

      const menuA = screen.queryByText("recipient_name_3");
      const menuB = screen.queryByText("recipient_name_4");

      expect(menuA).toBeInTheDocument();
      expect(menuB).toBeInTheDocument();
    });

    it("should render select care recipients in dropdown menu", async () => {
      const { getByTestId, getByText } = render(
        withReduxChakra(<Dashboard />, store),
      );

      userEvent.selectOptions(
        getByTestId("select-recipients"),
        "recipient_id_3",
      );

      expect(
        (getByText("recipient_name_3") as HTMLOptionElement).selected,
      ).toBeTruthy();
      expect(
        (getByText("recipient_name_4") as HTMLOptionElement).selected,
      ).toBeFalsy();
    });
  });

  describe("Top 3 Events", () => {
    it("renders top 3 events data", async () => {
      const fakeData = [
        {
          event_type: "mood_observation",
          event_count: 9,
        },
        {
          event_type: "check_out",
          event_count: 8,
        },
        {
          event_type: "medication_observation",
          event_count: 7,
        },
      ];

      const mockJsonPromise = Promise.resolve(fakeData);
      const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
      });
      globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

      await act(async () => {
        render(withReduxChakra(<Dashboard />, store));
      });

      expect(screen.getAllByText("check_out")).toHaveLength(2);
      expect(screen.getAllByText("medication_observation")).toHaveLength(2);
      expect(screen.getAllByText("mood_observation")).toHaveLength(3);

      globalRef.fetch.mockRestore();
    });
  });
});

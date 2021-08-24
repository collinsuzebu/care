import "./matchMedia.mock";
import React from "react";
import { withReduxChakra } from "./test-utils";
import { shallow } from "enzyme";
import App from "./App";

describe("App", () => {
  it("should render the App component", () => {
    shallow(withReduxChakra(<App />));
  });
});

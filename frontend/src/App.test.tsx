import "./matchMedia.mock";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import { mount, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";

import thunk from "redux-thunk";
import App from "./App";
import Chart from "./components/Chart/ChartHook";

jest.mock("./components/Chart/ChartHook", () => ({
  Chart: () => null, // render nothing
}));

const mockStore = configureMockStore([thunk]);
Object.assign(window, { SVGPathElement: () => {} });

class SVGPathElement extends HTMLElement {}

describe("App", () => {
  it("should render the App component", () => {
    const store = mockStore({
      recipient: { data: [] },
      recipients: { data: [] },
      recipientByParams: { data: [] },
    });

    // renderWithTheme(
    //   <Provider store={store}>
    //     <App />
    //   </Provider>,
    // );
    // expect(wrapper.find('Startup').length).toEqual(1)

    const div = document.createElement("div");
    document.body.appendChild(div);

    // ReactDOM.render(
    //   <Provider store={store}>
    //     <ChakraProvider>
    //       <App />
    //     </ChakraProvider>
    //   </Provider>,
    //   div,
    // );

    const wrapper = shallow(
      <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>,
    );

    // console.log(wrapper.debug());
  });
});

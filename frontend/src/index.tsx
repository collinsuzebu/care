import * as React from "react";
import ReactDOM from "react-dom";

import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

import { ChakraProvider } from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import "./index.css";

ReactDOM.render(
  <ReduxProvider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ReduxProvider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

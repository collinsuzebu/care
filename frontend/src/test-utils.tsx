import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { ChakraProvider } from "@chakra-ui/react";
import { keyable } from "./types";

export const createMockStore = (state: keyable) => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  return mockStore(state);
};

export const withReduxChakra = (component: any, store?: any) => {
  const mstore = createMockStore({
    recipient: { data: [] },
    recipients: { data: [] },
    recipientByParams: { data: [] },

    ...store,
  });

  return (
    <Provider store={mstore}>
      <ChakraProvider>{component}</ChakraProvider>
    </Provider>
  );
};

import { configureStore } from "@reduxjs/toolkit";
import {
  recipientsReducer,
  recipientReducer,
  recipientByEventReducer,
} from "./slices";

const store = configureStore({
  reducer: {
    recipients: recipientsReducer,
    recipient: recipientReducer,
    recipientByEvent: recipientByEventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

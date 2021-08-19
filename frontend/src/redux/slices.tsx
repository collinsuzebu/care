import { createSlice } from "@reduxjs/toolkit";
import { getRecipients, getRecipient, getRecipientByEvent } from "./thunks";

interface RecipientType {
  id: string;
  name: string;
}

export interface RecipientsState {
  data: Array<RecipientType>;
  loading: Boolean;
  error: null | string;
}

const initialState: RecipientsState = {
  data: [],
  loading: false,
  error: null,
};

export const recipientsSlice = createSlice({
  name: "recipients",
  initialState,
  reducers: {},
  extraReducers: {
    [getRecipients.pending.type]: (state) => {
      state.loading = true;
    },

    [getRecipients.rejected.type]: (state) => {
      state.loading = false;
      state.error = "failed to load resource";
    },

    [getRecipients.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
  },
});

export const recipientsReducer = recipientsSlice.reducer;

export interface RecipientState {
  data: Array<object>;
  loading: Boolean;
  error: null | string;
}

const initialRecipientState: RecipientState = {
  data: [],
  loading: false,
  error: null,
};

export const recipientSlice = createSlice({
  name: "recipient",
  initialState: initialRecipientState,
  reducers: {},
  extraReducers: {
    [getRecipient.pending.type]: (state) => {
      state.loading = true;
    },

    [getRecipient.rejected.type]: (state) => {
      state.loading = false;
      state.error = "failed to load resource";
    },

    [getRecipient.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
  },
});

export const recipientReducer = recipientSlice.reducer;

export interface RecipientByEventState {
  data: Array<object>;
  event_type: string;
  loading: Boolean;
  error: null | string;
}

const initialRecipientByEventState: RecipientByEventState = {
  data: [],
  event_type: "mood",
  loading: false,
  error: null,
};

export const recipientByEventSlice = createSlice({
  name: "recipientByEvent",
  initialState: initialRecipientByEventState,
  reducers: {},
  extraReducers: {
    [getRecipientByEvent.pending.type]: (state) => {
      state.loading = true;
    },

    [getRecipientByEvent.rejected.type]: (state) => {
      state.loading = false;
      state.error = "failed to load resource";
    },

    [getRecipientByEvent.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
  },
});

export const recipientByEventReducer = recipientByEventSlice.reducer;

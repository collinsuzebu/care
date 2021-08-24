import { createSlice } from "@reduxjs/toolkit";
import { getRecipients, getRecipient, getRecipientByParams } from "./thunks";

interface RecipientType {
  id: string;
  name: string;
}

export interface RecipientsState {
  data: Array<RecipientType>;
  loading: Boolean;
  error: null | string;
}

export const initialRecipientsState: RecipientsState = {
  data: [],
  loading: false,
  error: null,
};

export const recipientsSlice = createSlice({
  name: "recipients",
  initialState: initialRecipientsState,
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

export const initialRecipientState: RecipientState = {
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

export const initialRecipientByEventState: RecipientByEventState = {
  data: [],
  event_type: "mood",
  loading: false,
  error: null,
};

export const recipientByEventSlice = createSlice({
  name: "recipientByParams",
  initialState: initialRecipientByEventState,
  reducers: {},
  extraReducers: {
    [getRecipientByParams.pending.type]: (state) => {
      state.loading = true;
    },

    [getRecipientByParams.rejected.type]: (state) => {
      state.loading = false;
      state.error = "failed to load resource";
    },

    [getRecipientByParams.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
  },
});

export const recipientByEventReducer = recipientByEventSlice.reducer;

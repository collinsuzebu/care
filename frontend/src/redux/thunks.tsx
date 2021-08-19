import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchRecipients,
  fetchRecipient,
  fetchRecipientByEvent,
} from "../api/recipients";

export const getRecipients = createAsyncThunk(
  "recipients/getRecipients",
  async () => {
    return await fetchRecipients();
  },
);

export const getRecipient = createAsyncThunk(
  "recipients/getRecipient",
  async (recipientId: string) => {
    return await fetchRecipient(recipientId);
  },
);

export const getRecipientByEvent = createAsyncThunk(
  "recipients/recipientByEvent",
  async (data: any) => {
    const { recipientId, eventType, caregiverId, date, limit, offset } = data;

    return await fetchRecipientByEvent(
      recipientId,
      eventType,
      caregiverId,
      date,
      limit,
      offset,
    );
  },
);

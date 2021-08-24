import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchRecipients,
  fetchRecipient,
  fetchRecipientByParams,
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

export const getRecipientByParams = createAsyncThunk(
  "recipients/recipientByParams",
  async (data: any) => {
    const { recipientId, eventType, caregiverId, date, limit, offset } = data;

    return await fetchRecipientByParams(
      recipientId,
      eventType,
      caregiverId,
      date,
      limit,
      offset,
    );
  },
);

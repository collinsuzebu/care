import { getRecipients } from "./thunks";
import { initialRecipientsState, recipientsReducer } from "./slices";

describe("recipientsSlice", () => {
  const initState = initialRecipientsState;

  describe("extra reducers", () => {
    it("getRecipients.pending", () => {
      const state = recipientsReducer(
        initState,
        getRecipients.pending("recipients/getRecipients"),
      );
      const expected = {
        ...initState,
        loading: true,
      };
      expect(state.loading).toBe(true);
      expect(state).toStrictEqual(expected);
    });

    it("getRecipients.fulfilled", () => {
      const payload = [
        {
          recipient_id: "recipient_id_1",
          recipient_name: "recipient_name_1",
        },
      ];
      const state = recipientsReducer(
        initState,
        getRecipients.fulfilled(payload, "recipients/getRecipients"),
      );
      expect(state.loading).toBe(false);
      expect(state.data).toBe(payload);
    });

    it("getRecipients.rejected", () => {
      const error = "failed to load resource";
      const state = recipientsReducer(
        initState,
        getRecipients.rejected(Error(error), "recipients/getRecipients"),
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });
});

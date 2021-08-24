import { fetchRecipients } from "../api/recipients";
import { createMockStore } from "../test-utils";
import { initialRecipientsState } from "./slices";
import { getRecipients } from "./thunks";

jest.mock("../api/recipients", () => ({
  fetchRecipients: jest.fn(),
}));

describe("Thunks", () => {
  it("getRecipients", async () => {
    const store = createMockStore(initialRecipientsState);
    const mockPayload = [
      {
        recipient_id: "recipient_id_1",
        recipient_name: "recipient_name_1",
      },
    ];
    const expectedAction = getRecipients.fulfilled(
      mockPayload,
      "recipients/getRecipients",
    );

    (fetchRecipients as jest.Mock).mockReturnValue(
      Promise.resolve(mockPayload),
    );

    const thunk = store.dispatch(getRecipients() as any);

    thunk.then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toContainEqual(expectedAction);
    });
  });
});

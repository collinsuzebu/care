import * as request from "supertest";
import { mocked } from "ts-jest/utils";
import db from "../src/utils/db";

jest.mock("../src/utils/db");

const mockedDB = mocked(db);

let app: any;

const distinctCareRecipientsData = [
  { id: "df50cac5-293c-490d-a06c", name: "recipient_1" },
  { id: "e3e2bff8-d318-4760-beea", name: "recipient_2" },
  { id: "ad3512a6-91b1-4d7d-a005", name: "recipient_3" },
];

const distinctCareRecipients = [
  { care_recipient_id: "df50cac5-293c-490d-a06c" },
  { care_recipient_id: "e3e2bff8-d318-4760-beea" },
  { care_recipient_id: "ad3512a6-91b1-4d7d-a005" },
];

let careRecipient = [
  {
    id: "a1",
    care_recipient_id: "rep-abc-123",
    caregiver_id: "caregiver_1",
    event_type: "fluid_intake",
    payload: "",
    timestamp: "2019-04-26T08:01:24.611Z",
  },
];

let top3Events = [
  { event_type: "fluid_intake", event_count: 9 },
  { event_type: "alert_raised", event_count: 15 },
  { event_type: "alert_qualified", event_count: 5 },
];

let uniqueEvents = ["fluid_intake", "alert_raised", "alert_qualified"];

let uniqueCaregivers = ["caregiver_a", "caregiver_b", "caregiver_c"];

describe("Recipients Controller", () => {
  beforeAll(() => {
    const mockedQueryFn = {
      query: jest
        .fn()
        .mockResolvedValueOnce(distinctCareRecipients)
        .mockResolvedValueOnce(careRecipient)
        .mockResolvedValueOnce(top3Events)
        .mockResolvedValueOnce(uniqueEvents)
        .mockResolvedValueOnce(uniqueCaregivers)
        .mockResolvedValueOnce(careRecipient),
    };

    mockedDB.mockReturnValue(mockedQueryFn);

    const mod = require("../src/application");
    app = (mod as any).default;
  });

  it("should retrieve distinct care recipients", (done) => {
    request(app)
      .get("/recipients")
      .expect(200)
      .expect(function (res) {
        expect(res.body).toEqual(distinctCareRecipientsData);
      })
      .end((err, _) => {
        if (err) return done(err);
        done();
      });
  });

  it("should retrieve a unique care recipient with id", (done) => {
    request(app)
      .get("/recipients/rep-abc-123")
      .expect(200)
      .expect(function (res) {
        expect(res.body).toEqual(careRecipient);
      })
      .end((err, _) => {
        if (err) return done(err);
        done();
      });
  });

  it("should retrieve top 3 events of a care recipient", (done) => {
    request(app)
      .get("/recipients/rep-abc-123/events/summary")
      .expect(200)
      .expect(function (res) {
        expect(res.body).toEqual(top3Events);
      })
      .end((err, _) => {
        if (err) return done(err);
        done();
      });
  });

  it("should retrieve at most 10 unique events of a care recipient", (done) => {
    request(app)
      .get("/recipients/rep-abc-123/unique/events")
      .expect(200)
      .expect(function (res) {
        expect(res.body).toEqual(uniqueEvents);
      })
      .end((err, _) => {
        if (err) return done(err);
        done();
      });
  });

  it("should retrieve at most 10 unique caregivers of a care recipient", (done) => {
    request(app)
      .get("/recipients/rep-abc-123/unique/caregiver")
      .expect(200)
      .expect(function (res) {
        expect(res.body).toEqual(uniqueCaregivers);
      })
      .end((err, _) => {
        if (err) return done(err);
        done();
      });
  });

  it("should retrieve a care recipient by query params", (done) => {
    request(app)
      .get("/recipients/rep-abc-123/events")
      .query({
        limit: 1,
        event_type: "fluid_intake",
        caregiver: "caregiver_a",
        date: "2019-04-26T08:01:24.611Z",
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body).toEqual(careRecipient);
      })
      .end((err, _) => {
        if (err) return done(err);
        done();
      });
  });
});

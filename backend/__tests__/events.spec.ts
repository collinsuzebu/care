import * as request from "supertest";
import { mocked } from "ts-jest/utils";
import db from "../src/utils/db";

jest.mock("../src/utils/db");

const mockedDB = mocked(db);

const data = [
  { event_type: "alert_qualified", event_count: 13 },
  { event_type: "alert_raised", event_count: 831 },
  { event_type: "catheter_observation", event_count: 72 },
];

describe("Event Controller", () => {
  const mockedQueryFn = {
    query: jest.fn().mockResolvedValueOnce(data),
  };

  mockedDB.mockReturnValueOnce(mockedQueryFn);

  const mod = require("../src/application");
  const app = (mod as any).default;

  it("should retrieve event types and it's count", (done) => {
    request(app)
      .get("/events")
      .expect(200)
      .expect(function (res) {
        expect(res.body).toEqual(data);
      })
      .end((err, _) => {
        if (err) return done(err);
        return done();
      });
  });
});

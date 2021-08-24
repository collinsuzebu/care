import app from "../src/application";
import * as request from "supertest";

describe("/Hello Route.", () => {
  it("Hello", async () => {
    await request(app)
      .get("/hello")
      .expect(200)
      .expect(function (res) {
        expect(res.body.greetings).toContain("Hello");
      });
  });
});

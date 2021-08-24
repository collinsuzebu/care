import * as express from "express";

const pingController = express.Router();

pingController.get("/hello", (_, res) => {
  res.status(200).json({
    greetings: "Hello",
  });
});

export default pingController;

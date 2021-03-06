import * as express from "express";
import * as cors from "cors";
import * as path from "path";
require("dotenv").config();

import { FRONTEND_URL } from "./config";

// controllers
import pingController from "./controllers/ping";
import eventsController from "./controllers/events";
import recipientsController from "./controllers/recipients";
// import home from "./controllers/home";

const app = express();

// cors options
const corsOpt = {
  origin: FRONTEND_URL,
  methods: ["GET", "OPTIONS"],
  allowedHeaders:
    "Access-Control-Allow-Headers, Origin,OPTIONS,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  //   credentials: true,
};

app.use(cors(corsOpt));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(pingController);
app.use("/recipients", recipientsController);
// app.use("/home", home);
app.use("/events", eventsController);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/build")));
  app.get("*", (_, response) => {
    response.sendFile(
      path.join(__dirname, "../../frontend/build", "index.html"),
    );
  });
}

export default app;

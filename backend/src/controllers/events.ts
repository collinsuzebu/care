import * as express from "express";
import getDbConnection from "../utils/db";

const router = express.Router();

const db = getDbConnection();

console.log("DB", db);

router.get("/", async (_, res) => {
  const sql =
    "SELECT event_type, COUNT(*) AS event_count FROM events GROUP BY event_type LIMIT 3";

  const result = await db.query(sql);

  res.status(200).json(result);
});

export default router;

import getDbConnection, { escapeSql } from "../utils/db";
import * as express from "express";
import { formatDateToLastHours } from "../utils";

const router = express.Router();

const db = getDbConnection();

router.get("/", async (_, res) => {
  let sql = "SELECT DISTINCT care_recipient_id FROM events";

  try {
    let care_recipient_ids: any = await db.query(sql);

    let result = care_recipient_ids.map(
      (recipient: { care_recipient_id: string }, index: number) => ({
        id: recipient.care_recipient_id,
        name: `recipient_${index + 1}`,
      }),
    );
    res.status(200).json(result);
  } catch (error) {
    console.log("DB error", error);
  }
});

router.get("/:id", async (req, res) => {
  let recipient_id = escapeSql(req.params.id);
  let selectOptions =
    "id, care_recipient_id, caregiver_id, event_type, payload, timestamp";
  let sql = `
  SELECT ${selectOptions}
  FROM events
  WHERE care_recipient_id=${recipient_id}
  ORDER BY timestamp
  LIMIT 10`;
  try {
    let result = await db.query(sql);
    res.status(200).json(result);
  } catch (error) {
    console.log("DB error", error);
  }
});

router.get("/:id/events", async (req, res) => {
  let recipient_id = escapeSql(req.params.id);
  let date = req.query.date;
  let limit = req.query.limit || 50;
  let offset = req.query.offset;
  let event_type = req.query.event_type;
  let caregiverId = req.query.caregiver;

  let spacer = " ";

  let selectOptions =
    "id, care_recipient_id, caregiver_id, event_type, payload, timestamp";

  var sql = `
  SELECT ${selectOptions} 
  FROM events 
  WHERE care_recipient_id=${recipient_id} 
  `;
  if (date) {
    let dateQuery = `AND timestamp BETWEEN '${date}' AND '${formatDateToLastHours(
      date as string,
    )}'`;
    sql += spacer + dateQuery;
  }

  if (event_type) {
    sql += spacer + `AND event_type='${event_type}'`;
  }

  if (caregiverId) {
    sql += spacer + `AND caregiver_id='${caregiverId}'`;
  }

  sql += spacer + "ORDER BY timestamp";
  sql += spacer + `LIMIT ${limit}`;

  if (offset) {
    sql += spacer + `OFFSET ${offset}`;
  }

  try {
    let result = await db.query(sql);
    res.status(200).json(result);
  } catch (error) {
    console.log("DB error", error);
  }
});

router.get("/:id/events/summary", async (req, res) => {
  let recipient_id = escapeSql(req.params.id);
  let sql = `
  SELECT event_type, COUNT(*) AS event_count
  FROM events 
  WHERE care_recipient_id=${recipient_id} 
  GROUP BY event_type 
  LIMIT 3`;

  try {
    let result = await db.query(sql);
    res.status(200).json(result);
  } catch (error) {
    console.log("DB error", error);
  }
});

router.get("/:id/unique/events", async (req, res) => {
  let recipient_id = escapeSql(req.params.id);
  let sql = `
  SELECT DISTINCT event_type 
  FROM events 
  WHERE care_recipient_id=${recipient_id} 
  ORDER BY timestamp  
  LIMIT 10`;
  try {
    let result = await db.query(sql);
    res.status(200).json(result);
  } catch (error) {
    console.log("DB error", error);
  }
});

router.get("/:id/unique/caregiver", async (req, res) => {
  let recipient_id = escapeSql(req.params.id);
  let sql = `
  SELECT DISTINCT caregiver_id 
  FROM events 
  WHERE care_recipient_id=${recipient_id} 
  ORDER BY timestamp  
  LIMIT 10`;
  try {
    let result = await db.query(sql);
    res.status(200).json(result);
  } catch (error) {
    console.log("DB error", error);
  }
});

export default router;

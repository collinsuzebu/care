import * as mysql from "mysql";
import * as util from "util";
import { DB_CONFIG } from "../config";

export const escapeSql = (string: string) => {
  return mysql.escape(string);
};

const getDbConnection = () => {
  const pool = mysql.createPool(DB_CONFIG);
  return {
    query(sql: string) {
      return util.promisify(pool.query).call(pool, sql);
    },
  };
};

export default getDbConnection;

import { Sequelize } from "sequelize";

const db = new Sequelize("itemdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

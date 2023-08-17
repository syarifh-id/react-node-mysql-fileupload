import sequelize from "sequelize";
import db from "./Database.js";

const { DataTypes } = sequelize;
const Items = db.define(
  "item",
  {
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Items;
(async () => {
  await db.sync();
})();

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "City",
  tableName: "city",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      unique: true,
    },
    createdDate: {
      type: "timestamp",
      createDate: true, // Automatically set on insert
    },
  },
  relations: {
    district: {
      target: "District",
      type: "many-to-one",
      joinColumn: { name: "district_id" },
      onDelete: "CASCADE",
    },
    routes: {
      target: "Route",
      type: "one-to-many",
      inverseSide: "city",
    },
  },
});

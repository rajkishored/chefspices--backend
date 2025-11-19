const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "District",
  tableName: "districts",
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
    cities: {
      target: "City",
      type: "one-to-many",
      inverseSide: "districts",
      cascade: true,
    },
  },
});

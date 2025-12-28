const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Sales",
  tableName: "sales",
  columns: {
    id: { primary: true, type: "int", generated: true },
    address: { type: "varchar" },
    city: { type: "varchar" },
    dob: { type: "date" },
    aadhaarNo: { type: "varchar", unique: true },
    panNo: { type: "varchar", unique: true },
  },

  relations: {
    user: {
      type: "one-to-one",
      target: "User",
      joinColumn: { name: "userId" },   // creates user _id column
      onDelete: "CASCADE",
      eager: true,
    },
  },
});

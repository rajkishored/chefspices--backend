const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Routee",
  tableName: "routes",
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
      createDate: true,
    },
  },
  relations: {
    city: {
      target: "City",
      type: "many-to-one",
      joinColumn: { name: "city_id" },
      onDelete: "CASCADE",
    },
    places: {
      target: "Place",
      type: "many-to-one",
      inverseSide: "route", // ✅ a route has many places
    },
    users: {
      target: "User",
      type: "many-to-one",
    joinColumn: {
    name: "user_id",
  },
  nullable: true, // ✅ THIS IS THE KEY
  onDelete: "SET NULL",
    },
  },
});

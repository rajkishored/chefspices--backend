const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Route",
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
      type: "one-to-many",
      inverseSide: "route", // ✅ a route has many places
    },
    // users: {
    //   target: "User",
    //   type: "many-to-many",
    //   joinTable: {
    //     name: "user_routes",
    //     joinColumn: { name: "route_id", referencedColumnName: "id" },
    //     inverseJoinColumn: { name: "user_id", referencedColumnName: "id" },
    //   },
    //   inverseSide: "routes",
    // },
  },
});

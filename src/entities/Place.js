// const { Entity } = require("typeorm");
const { type } = require("express/lib/response");
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Place",
  tableName: "places",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    description: {
      type: "text",
      nullable: true,
    },
    createdDate: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    route: {
      target: "Route",
      type: "many-to-one",
      joinColumn: { name: "route_id" },
      onDelete: "CASCADE",
      inverseSide: "places",
    },
  },
});

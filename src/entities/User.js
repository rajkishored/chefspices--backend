const { EntitySchema } = require("typeorm");
const bcrypt = require("bcrypt");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
  },
  relations: {
    role: {
      type: "many-to-one",
      target: "Role",
      joinColumn: true,
      eager: true,
    },
    // route: {
    //   type: "one-to-many",
    //   target:"Route",
    //   joinColumn: ,
    //   onDelete:"CASCADE"
    // },
  },
  beforeInsert: async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  },
});

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    phone: {
      type: "varchar",
      unique: true,
    },
    address: {
      type: "varchar",
    },
    dob: {
      type: "date",
    },
    adhaarNo: {
      type: "varchar",
      unique: true,
    },
    panNo: {
      type: "varchar",
      unique: true,
    },
    city: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
  relations: {
    role: {
      type: "many-to-one",
      target: "Role",
      joinColumn: true,
      eager: true,
    },
    // route: {
    //   type: "one-to-many",
    //   target:"Route",
    //   joinColumn: ,
    //   onDelete:"CASCADE"
    // },
  },
  beforeInsert: async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  },
});

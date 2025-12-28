const { EntitySchema } = require("typeorm");
const bcrypt = require("bcrypt");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
   columns: {
    id: { primary: true, type: "int", generated: true },
    name: { type: "varchar" },
    phone:{type:"varchar",unique: true },
    email: { type: "varchar", unique: true },
    password: { type: "varchar" },
  },


   relations: {
    role: {
      type: "many-to-one",
      target: "Role",
     joinColumn: { name: "roleId" },
      eager: true,
    },

    sales: {
      type: "one-to-one",
      target: "Sales",
      inverseSide: "user",
    },
  },

 listeners: {
    beforeInsert: async (event) => {
      if (event.entity.password) {
        event.entity.password = await bcrypt.hash(event.entity.password, 10);
      }
    },
  },
});

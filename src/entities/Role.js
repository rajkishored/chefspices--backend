const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
   name:"Role",
   tableName:"roles",
   columns:{
    id:{
        primary:true,
        type:"int",
        generated:true
    },
    roleName:{
        type:"varchar",
         unique:true
    }
   },
   relations: {
    users: {
      type: "one-to-many",
      target: "User",
      inverseSide: "role",
    },
  },
});
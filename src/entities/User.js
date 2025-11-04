const { EntitySchema } = require("typeorm");
const bcrypt = require("bcrypt");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        email: {
            type: "varchar",
            unique: true
        },
        password: {
            type: "varchar"
        }
    },
    relations: {
        role: {
            type: "many-to-one",
            target: "Role",
            joinColumn: true,
            eager: true
        }
    },
    beforeInsert: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
    }
});
const Sequelize = require("sequelize");
const connect = new Sequelize(
  process.env.DATABASE || "postgres://localhost/acme_express_spa"
);
const { STRING, INTEGER, FLOAT } = Sequelize;

const auditionee = connect.define("auditionee", {
  name: {
    type: STRING,
    allowNull: false,
  },
  age: {
    type: INTEGER,
    allowNull: false,
  },
  height: {
    type: FLOAT,
    allowNull: false,
  },
});

const role = connect.define("role", {
  rolename: {
    type: STRING,
    allowNull: false,
  },
  age: {
    type: INTEGER,
    allowNull: false,
  },
  gender: {
    type: STRING,
    allowNull: false,
  },
});

auditionee.belongsTo(role);
role.belongsTo(auditionee);

module.exports = {
  auditionee,
  role,
  connect,
};

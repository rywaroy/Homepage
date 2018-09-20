const sequelize = require('../sequelize');
const Sequelize = require('sequelize');

const Plan = sequelize.define('plan', {
  title: {
    type: Sequelize.STRING,
  },
  start: {
    type: Sequelize.DATE,
  },
  state: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Plan;

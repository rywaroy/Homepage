const sequelize = require('../sequelize');
const Sequelize = require('sequelize');

const PlanRecord = sequelize.define('plan_record', {
  tid: {
    type: Sequelize.INTEGER,
  },
  time: {
    type: Sequelize.DATEONLY,
  },
});

module.exports = PlanRecord;

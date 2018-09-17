const sequelize = require('../sequelize');
const Sequelize = require('sequelize');

const Learn = sequelize.define('learn', {
  title: {
    type: Sequelize.TEXT,
  },
  time: {
    type: Sequelize.DATE,
  },
  intro: {
    type: Sequelize.TEXT,
  },
  state: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  md: {
    type: Sequelize.TEXT,
  },
  html: {
    type: Sequelize.TEXT,
  },
  Tag: {
    type: Sequelize.TEXT,
  },
});

module.exports = Learn;

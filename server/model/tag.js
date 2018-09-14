const sequelize = require('../sequelize');
const Sequelize = require('sequelize');

const Tag = sequelize.define('tag', {
  title: {
    type: Sequelize.STRING,
  },
  color: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Tag;

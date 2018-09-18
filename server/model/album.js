const sequelize = require('../sequelize');
const Sequelize = require('sequelize');

const Album = sequelize.define('album', {
	title: {
    type: Sequelize.TEXT,
  },
  img: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.DATE,
  },
  state: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Album;

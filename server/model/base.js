const sequelize = require('../sequelize');
const Sequelize = require('sequelize');

const Base = sequelize.define('base', {
	word: {
		type: Sequelize.TEXT,
	},
});

module.exports = Base;

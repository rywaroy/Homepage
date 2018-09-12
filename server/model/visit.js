const sequelize = require('../sequelize');
const Sequelize = require('sequelize');

const Visit = sequelize.define('visit', {
	ip: {
		type: Sequelize.STRING,
	},
	time: {
		type: Sequelize.DATE,
	},
	address: {
		type: Sequelize.STRING,
	},
	device: {
		type: Sequelize.STRING,
	},
});

module.exports = Visit;

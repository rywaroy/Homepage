const sequelize = require('../sequelize');
const Sequelize = require('sequelize');

const Admin = sequelize.define('admin', {
	account: {
		type: Sequelize.STRING,
	},
	password: {
		type: Sequelize.STRING,
	},
	token: {
		type: Sequelize.STRING,
	},
	name: {
		type: Sequelize.STRING,
	},
	avatar: {
		type: Sequelize.STRING,
	},
	time: {
		type: Sequelize.DATE,
	},
	last_time: {
		type: Sequelize.DATE,
	},
	location: {
		type: Sequelize.STRING,
	},
	last_location: {
		type: Sequelize.STRING,
	},
});

module.exports = Admin;

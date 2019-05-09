import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

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
	created_at: {
		type: Sequelize.DATE,
	},
	updated_at: {
		type: Sequelize.DATE,
	},
});

export default Admin;

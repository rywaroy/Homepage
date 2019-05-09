import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

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
	created_at: {
		type: Sequelize.DATE,
	},
	updated_at: {
		type: Sequelize.DATE,
	},
});

export default Visit;

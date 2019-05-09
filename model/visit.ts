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
	createdAt: {
		type: Sequelize.DATE,
	},
	updatedAt: {
		type: Sequelize.DATE,
	},
});

export default Visit;

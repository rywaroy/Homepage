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
});

export default Visit;

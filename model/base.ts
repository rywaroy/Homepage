import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Base = sequelize.define('base', {
	word: {
		type: Sequelize.TEXT,
	},
	createdAt: {
		type: Sequelize.DATE,
	},
	updatedAt: {
		type: Sequelize.DATE,
	},
});

export default Base;

import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Base = sequelize.define('base', {
	word: {
		type: Sequelize.TEXT,
	},
	created_at: {
		type: Sequelize.DATE,
	},
	updated_at: {
		type: Sequelize.DATE,
	},
});

export default Base;

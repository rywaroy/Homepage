import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Base = sequelize.define('base', {
	word: {
		type: Sequelize.TEXT,
	},
});

export default Base;

import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Plan = sequelize.define('plan', {
  title: {
    type: Sequelize.STRING,
  },
  start: {
    type: Sequelize.DATE,
  },
  state: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  created_at: {
		type: Sequelize.DATE,
	},
	updated_at: {
		type: Sequelize.DATE,
	},
});

export default Plan;

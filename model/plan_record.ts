import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const PlanRecord = sequelize.define('plan_record', {
  tid: {
    type: Sequelize.INTEGER,
  },
  time: {
    type: Sequelize.DATEONLY,
  },
  createdAt: {
		type: Sequelize.DATE,
	},
	updatedAt: {
		type: Sequelize.DATE,
	},
});

export default PlanRecord;

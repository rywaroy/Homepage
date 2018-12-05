import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const PlanRecord = sequelize.define('plan_record', {
  tid: {
    type: Sequelize.INTEGER,
  },
  time: {
    type: Sequelize.DATEONLY,
  },
});

export default PlanRecord;

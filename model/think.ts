import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Think = sequelize.define('think', {
  avatar: {
    type: Sequelize.TEXT,
  },
  time: {
    type: Sequelize.DATE,
  },
  name: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.TEXT,
  },
  photos: {
    type: Sequelize.TEXT,
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

export default Think;

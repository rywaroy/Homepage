import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Think = sequelize.define('think', {
  avatar: {
    type: Sequelize.TEXT,
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
  createdAt: {
		type: Sequelize.DATE,
	},
	updatedAt: {
		type: Sequelize.DATE,
	},
});

export default Think;

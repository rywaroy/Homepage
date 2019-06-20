import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Learn = sequelize.define('learn', {
  title: {
    type: Sequelize.TEXT,
  },
  intro: {
    type: Sequelize.TEXT,
  },
  state: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  md: {
    type: Sequelize.TEXT,
  },
  html: {
    type: Sequelize.TEXT,
  },
  tag: {
    type: Sequelize.TEXT,
  },
  type: {
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

export default Learn;

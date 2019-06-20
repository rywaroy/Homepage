import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Album = sequelize.define('album', {
	title: {
    type: Sequelize.TEXT,
  },
  img: {
    type: Sequelize.STRING,
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

export default Album;

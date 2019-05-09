import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Tag = sequelize.define('tag', {
  title: {
    type: Sequelize.STRING,
  },
  color: {
    type: Sequelize.STRING,
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

export default Tag;

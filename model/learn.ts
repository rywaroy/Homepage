import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Learn = sequelize.define('learn', {
  title: {
    type: Sequelize.TEXT,
  },
  time: {
    type: Sequelize.DATE,
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
});

export default Learn;

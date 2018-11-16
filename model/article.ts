
import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Article = sequelize.define('article', {
  title: {
    type: Sequelize.TEXT,
  },
  time: {
    type: Sequelize.DATE,
  },
  content: {
    type: Sequelize.TEXT,
  },
  intro: {
    type: Sequelize.TEXT,
  },
  tagid: {
    type: Sequelize.INTEGER,
  },
  state: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  top: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  watch: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

export default Article;

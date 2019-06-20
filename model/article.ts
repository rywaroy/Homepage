
import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Article = sequelize.define('article', {
  title: {
    type: Sequelize.TEXT,
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
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  img: {
    type: Sequelize.TEXT,
  },
  createdAt: {
		type: Sequelize.DATE,
	},
	updatedAt: {
		type: Sequelize.DATE,
	},
});

export default Article;

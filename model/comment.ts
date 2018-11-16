import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const Comment = sequelize.define('comment', {
  name: {
    type: Sequelize.TEXT,
  },
  content: {
    type: Sequelize.TEXT,
  },
  aid: {
    type: Sequelize.INTEGER,
  },
  time: {
    type: Sequelize.DATE,
  },
});

export default Comment;

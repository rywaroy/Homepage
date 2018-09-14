const sequelize = require('../sequelize');
const Sequelize = require('sequelize');

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

module.exports = Comment;

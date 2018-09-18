const sequelize = require('../sequelize');
const Sequelize = require('sequelize');

const AlbumGroup = sequelize.define('album_group', {
	album_id: {
    type: Sequelize.INTEGER,
  },
  url: {
    type: Sequelize.STRING,
  },
});

module.exports = AlbumGroup;

import * as Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

const AlbumGroup = sequelize.define('album_group', {
	album_id: {
    type: Sequelize.INTEGER,
  },
  url: {
    type: Sequelize.STRING,
  },
  createdAt: {
		type: Sequelize.DATE,
	},
	updatedAt: {
		type: Sequelize.DATE,
	},
});

export default AlbumGroup;

import * as Sequelize from 'sequelize';

const sequelize: any = new Sequelize('blog', 'zzh', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    charset: 'utf8',
    // timestamps: false, // 默认为 true
    freezeTableName: true,
  },
});

export default sequelize;

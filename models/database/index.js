const Sequelize = require("sequelize");

const sequelize = new Sequelize('lugares', 'postgres', 'admin', { dialect: 'postgres', host: 'localhost', port: 5432,  ssl: true, 
// protocol: "postgres",
// logging: true,
// dialectOptions: {
//   ssl: {
//     require: true,
//     rejectUnauthorized: false
//   }
// }
 
  });

module.exports = sequelize;
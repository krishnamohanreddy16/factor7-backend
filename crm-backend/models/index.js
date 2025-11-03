const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Employee = require('./employee')(sequelize);
const Enquiry = require('./enquiry')(sequelize);

// Associations
Employee.hasMany(Enquiry, { foreignKey: 'counselorId' });
Enquiry.belongsTo(Employee, { foreignKey: 'counselorId' });

module.exports = {
  sequelize,
  Sequelize,
  Employee,
  Enquiry
};

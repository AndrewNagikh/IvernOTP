'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Account.init({
    user_id: DataTypes.STRING,
    puuid: DataTypes.TEXT,
    region: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmContribution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FarmContribution.belongsTo(models.Client);
    }
  };
  FarmContribution.init({
    name: { type: DataTypes.STRING(50), allowNull: false },
    address: { type: DataTypes.STRING(50), allowNull: false },
    city: { type: DataTypes.STRING(40), allowNull: false },
    postal_code: { type: DataTypes.INTEGER(5), allowNull: true }
  }, {
    sequelize,
    modelName: 'FarmContribution',
  });
  return FarmContribution;
};

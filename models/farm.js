'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Farm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Farm.belongsToMany(models.Farmer, { through: 'FarmersFarms' });
      Farm.hasMany(models.FarmImage);
      Farm.hasMany(models.FarmSchedule);
      Farm.belongsToMany(models.FarmProduct, { through: 'FarmsProducts' });
    }
  };
  Farm.init({
    name: { type: DataTypes.STRING(50), allowNull: false },
    address: { type: DataTypes.STRING(50), allowNull: false },
    city: { type: DataTypes.STRING(40), allowNull: false },
    postal_code: { type: DataTypes.INTEGER(5), allowNull: true },
    location: { type: DataTypes.GEOMETRY, allowNull: false },
    website: { type: DataTypes.STRING(45), allowNull: true },
  }, {
    sequelize,
    modelName: 'Farm',
  });
  return Farm;
};

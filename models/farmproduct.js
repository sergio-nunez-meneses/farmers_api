'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FarmProduct.belongsToMany(models.Farm, { through: 'FarmsProducts' });
      FarmProduct.belongsToMany(models.ProductLabel, { through: 'ProductsLabels' });
    }
  };
  FarmProduct.init({
    name: { type: DataTypes.STRING(50), allowNull: false },
    type: { type: DataTypes.STRING(40), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    season: { type: DataTypes.STRING(50), allowNull: false }
  }, {
    sequelize,
    modelName: 'FarmProduct',
  });
  return FarmProduct;
};

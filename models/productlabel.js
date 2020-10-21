'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductLabel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductLabel.belongsToMany(models.FarmProduct, { through: 'ProductsLabels' });
    }
  };
  ProductLabel.init({
    name: { type: DataTypes.STRING(50), allowNull: false },
    image: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
  }, {
    sequelize,
    modelName: 'ProductLabel',
  });
  return ProductLabel;
};

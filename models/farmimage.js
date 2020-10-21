'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FarmImage.belongsTo(models.Farm);
    }
  };
  FarmImage.init({
    name: { type: DataTypes.STRING(100), allowNull: false }
  }, {
    sequelize,
    modelName: 'FarmImage',
  });
  return FarmImage;
};

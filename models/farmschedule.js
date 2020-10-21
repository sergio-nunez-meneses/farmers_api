'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FarmSchedule.belongsTo(models.Farm);
    }
  };
  FarmSchedule.init({
    day: { type: DataTypes.STRING(10), allowNull: false },
    start_time: { type: DataTypes.TIME, allowNull: false },
    end_time: { type: DataTypes.TIME, allowNull: false },
    activity: { type: DataTypes.STRING(40), allowNull: false }
  }, {
    sequelize,
    modelName: 'FarmSchedule',
  });
  return FarmSchedule;
};

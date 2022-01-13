const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
           * Helper method for defining associations.
           * This method is not a part of Sequelize lifecycle.
           * The `models/index` file will call this method automatically.
           */
    static associate(models) {
      this.belongsTo(models.userRole, {
        foreignKey: 'userRoleId',
        as: 'userRole',
      });
    }
  }

  user.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
    resetToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
    freezeTableName: true,
  });
  return user;
};

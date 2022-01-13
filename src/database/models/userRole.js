const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
    static associate(models) {
      // role belong to many users
      this.hasMany(models.users, {
        foreignKey: 'userRoleId',
        as: 'user',
      });
    }
  }

  UserRole.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'userRole',
    freezeTableName: true,
  });
  return UserRole;
};

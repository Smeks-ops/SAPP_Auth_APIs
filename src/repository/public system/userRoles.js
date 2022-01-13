/* eslint-disable class-methods-use-this */
const {
  userRole: userRoleModel,
} = require('../../database/models');
const {
  users: userModel,
} = require('../../database/models');

class UserRoles {
  static async getAllUserRoles() {
    return await userRoleModel.findAll({ raw: true });
  }

  static async getUserRoleByName(field = {}) {
    const { role } = field;

    const { id } = await userRoleModel.findOne({
      where: {
        name: role,
      },
      attributes: ['id'],
      raw: true,
    });
    return id;
  }

  static async getUserRoleById(field = {}) {
    const userRole = await userRoleModel.findOne({
      where: field,
      attributes: {
        exclude: ['userRoleId'],
      },
      raw: true,
    });

    return userRole;
  }

  static async getAndCountAllRoles() {
    const userRoles = await userRoleModel.findAll({
      attributes: ['id', 'name'],
      raw: true,
    });

    for (let i = 0; i < userRoles.length; i++) {
      const noOfUsers = await userModel.count({ where: { userRoleId: userRoles[i].id } });
      userRoles[i].noOfUsers = noOfUsers;
    }

    return { userRoles };
  }
}

export default UserRoles;

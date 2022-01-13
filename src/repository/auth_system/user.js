/* eslint-disable class-methods-use-this */
import formatSequelizeData from '../../utils/formatSequelizeData';

const sequelize = require('sequelize');

const {
  users: userModel,
  // userRole: userRoleModel,
} = require('../../database/models');

class publicUser {
  static async createUser(field = {}) {
    const {
      firstName,
      lastName,
      email,
      password,
      token,
      userRoleId,
    } = field;

    const User = await userModel.create({
      firstName,
      lastName,
      email,
      password,
      token,
      userRoleId,
    });
    return User;
  }

  static async getUserByEmail(field = {}) {
    let user = await userModel.findOne({
      where: field,
      raw: true,
      active: true,
    });
    user = formatSequelizeData(user);
    return user;
  }

  static async getAUserByEmail(field = {}) {
    const {
      email,
    } = field;

    const user = await userModel.findOne({
      where: {
        email,
      },
      raw: true,
    });

    return user;
  }

  static async getUserById(field = {}) {
    return await userModel.findOne({
      where: field,
      raw: true,
      active: true,
    });
  }

  static async getOneUserByMatch(field = {}) {
    let user = await userModel.findOne({
      where: field,
      active: true,
    });
    user = formatSequelizeData(user);
    return user;
  }

  static async updateUser(field = {}, userData) {
    const {
      firstName,
      lastName,
      email,
      password,
      token,
      resetToken,
    } = field;

    const updatedUser = await userModel.update({
      firstName: firstName || userData.firstName,
      lastName: lastName || userData.lastName,
      password: password || userData.password,
      email: email || userData.email,
      token: token || userData.token,
      resetToken: resetToken || userData.resetToken,
    }, {
      where: {
        email: userData.email,
      },
      raw: true,
    });

    return updatedUser;
  }
}

export default publicUser;

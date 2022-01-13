import sendMail from '../../services/emailSender';
import {
  validateCreateUserDetails, validateUserLogin, validateUserEmail, validateUserPassword,
} from '../../validation-schema/auth_system/auth';
import { resetPasswordEmailTemplate, inviteUserEmailTemplate } from '../../utils/emailTemplates';
import User from '../../repository/auth_system/user';
import UserRoles from '../../repository/auth_system/userRoles';

const bcrypt = require('bcrypt');
const {
  JWT_USER_SECRET,
  JWT_RESET_PASSWORD_SECRET,
} = require('../../config/env_variables');
const { debugLog } = require('../../config/env_variables');
const {
  failureResponse,
  statusCodes,
  successResponse,
  serverFailure,
} = require('../../utils/api-response');
const { default: generateJWTToken } = require('../../utils/tokenGenerator');

class PublicSystemAuthController {
  static async createUser(req, res) {
    try {
      const payload = req.body;

      // validate payload
      const validation = validateCreateUserDetails(payload);
      if (validation.error) {
        return failureResponse(res, statusCodes.BAD_REQUEST, validation.error.message);
      }

      // check if user with same email exists
      const { email } = payload;
      const userExists = await User.getOneUserByMatch({ email });
      if (userExists) {
        return failureResponse(res, statusCodes.BAD_REQUEST, 'user exists with email');
      }

      // encrypt the new password
      const { password } = req.body;
      const encryptedPassword = bcrypt.hashSync(password, 10);

      // add encrypted Password to the payload
      payload.password = encryptedPassword;

      // get userRoleId from the req body
      const { userRoleId } = req.body;

      const userRole = await UserRoles.getUserRoleById({ id: userRoleId });

      if (!userRole) {
        return failureResponse(res, statusCodes.BAD_REQUEST, 'user role not found');
      }

      // add userRoleId to the payload
      payload.userRoleId = userRoleId;

      const token = generateJWTToken({ email, role: userRole.name }, JWT_USER_SECRET, '300d');

      // add token to the payload
      payload.token = token;

      // create new user
      const newPublicUser = await User.createUser(payload);

      if (!newPublicUser) {
        return failureResponse(res, statusCodes.BAD_REQUEST, 'unable to create user , please try again');
      }

      // send email to the user with their credentials
      sendMail({
        email,
        to: email,
        subject: 'Welcome to Grooming Center',
        html: inviteUserEmailTemplate(email, token),
      }).catch((e) => {
        console.log({
          emailErrorLog: e,
        });
      });

      return successResponse(res, statusCodes.SUCCESS, 'sign up successful', newPublicUser);
    } catch (error) {
      if (debugLog) {
        console.log({ error });
      }
      return serverFailure(res);
    }
  }

  static async Login(req, res) {
    const { email, password } = req.body;

    // validate login details
    const validation = validateUserLogin({
      email,
      password,
    });
    if (validation.error) {
      return failureResponse(res, statusCodes.BAD_REQUEST, validation.error.message);
    }
    try {
      // check if user exists
      const user = await User.getOneUserByMatch({ email });
      if (!user) {
        return failureResponse(res, statusCodes.UNAUTHORIZED, 'Incorrect email or password');
      }

      // compare the passwords using bcrypt
      const passwordIsValid = bcrypt.compareSync(password, user.password);

      // get User Role
      const { name: userRoleName } = await UserRoles.getUserRoleById({
        id: user.userRoleId,
      });

      if (passwordIsValid) {
        const loggedInUser = await User.getUserByEmail({ email });
        const token = generateJWTToken({ email, role: userRoleName, id: user.id }, JWT_USER_SECRET, '300d');

        return successResponse(res, 200, 'login success', { loggedInUser, token });
      }
      return failureResponse(res, statusCodes.UNAUTHORIZED, 'Incorrect email or password');
    } catch (error) {
      if (debugLog) {
        console.log({ error });
      }
      return serverFailure(res);
    }
  }

  static async ForgotPassword(req, res) {
    const { email } = req.body;

    // validate inputted email
    const validation = validateUserEmail({ email });
    if (validation.error) {
      return failureResponse(res, statusCodes.BAD_REQUEST, validation.error.message);
    }

    // get user
    const user = await User.getUserByEmail({ email });
    if (!user) {
      return failureResponse(res, statusCodes.NOT_FOUND, 'user does not exist');
    }
    try {
      // generate token for password reset
      const token = generateJWTToken({ email }, JWT_RESET_PASSWORD_SECRET, '30d');
      const hashToken = bcrypt.hashSync(token, 10);

      await User.updateUser({
        resetToken: hashToken,
      }, user);

      sendMail({
        to: email,
        subject: 'You requested to change your password',
        html: resetPasswordEmailTemplate(token),
      }).catch((e) => {
        console.log({
          emailErrorLog: e,
        });
      });
      return successResponse(res, statusCodes.SUCCESS, 'email sent please check your mail');
    } catch (error) {
      return serverFailure(res);
    }
  }

  static async UpdatePassword(req, res) {
    const { password } = req.body;
    const { email } = req.userData;
    const { token } = req;

    // validate the password
    const validation = validateUserPassword({ password });
    if (validation.error) {
      return failureResponse(res, statusCodes.BAD_REQUEST, validation.error.message);
    }

    try {
      // check if user exists
      const user = await User.getUserByEmail({ email });
      if (!user) {
        return failureResponse(res, statusCodes.NOT_FOUND, 'user does not exist');
      }

      // compare the hashed reset token from the db with the token provided
      const isValidToken = await bcrypt.compare(token, user.resetToken);
      if (!isValidToken) {
        return failureResponse(res, statusCodes.UNAUTHORIZED, 'Invalid token');
      }

      // encrypt the new password
      const encryptedPassword = bcrypt.hashSync(password, 10);
      // update the password
      await User.updateUser({
        password: encryptedPassword,
        resetToken: 'null',
      }, user);

      return successResponse(res, 200, 'password changed');
    } catch (error) {
      return serverFailure(res);
    }
  }

  static async Profile(req, res) {
    const { email } = req.userData;

    try {
      // check if user exist
      const user = await User.getAUserByEmail({ email });

      // delete user password
      delete user.password;
      delete user.iv;
      delete user.resetToken;

      if (!user) {
        return failureResponse(res, statusCodes.NOT_FOUND, 'user does not exist');
      }

      // add current date and time to users info
      const currentDateTime = new Date().toISOString();
      user.currentDateTime = currentDateTime;

      return successResponse(res, statusCodes.SUCCESS, 'profile fetched successfully', user);
    } catch (error) {
      return serverFailure(res);
    }
  }
}
export default PublicSystemAuthController;

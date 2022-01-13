import jwt from 'jsonwebtoken';
import { JWT_RESET_PASSWORD_SECRET, JWT_USER_SECRET } from '../config/env_variables';
import { failureResponse, statusCodes } from '../utils/api-response';

const {
  users: userModel,
  // userRole: userRoleModel,
} = require('../database/models');

// verifies that jwt token is valid
export function checkResetPasswordToken(req, res, next) {
  const header = req.headers.authorization;
  try {
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1] || req.token;
      const decoded = jwt.verify(token, JWT_RESET_PASSWORD_SECRET);
      req.userData = decoded;
      req.token = token;
      next();
    } else {
      failureResponse(res, statusCodes.FORBIDDEN, 'token is required');
    }
  } catch (error) {
    return failureResponse(res, statusCodes.FORBIDDEN, 'Invalid token');
  }
}

// verifies that user jwt token is valid
export default function checkUserToken(req, res, next) {
  const header = req.headers.authorization;
  try {
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1] || req.token;
      const decoded = jwt.verify(token, JWT_USER_SECRET);
      req.userData = decoded;
      next();
    } else {
      failureResponse(res, statusCodes.FORBIDDEN, 'token is required');
    }
  } catch (error) {
    return failureResponse(res, statusCodes.FORBIDDEN, 'Invalid token');
  }
}

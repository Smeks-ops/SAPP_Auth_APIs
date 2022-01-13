const { SUPER_ADMIN_ROLE_NAME, ADMIN_ROLE_NAME, debugLog } = require('../config/env_variables');
const {
  failureResponse,
  statusCodes,
  serverFailure,
} = require('../utils/api-response');

export default function checkRole(req, res, next) {
  try {
    // check if the client is an admin or super admin
    const { role } = req.userData;
    if (role !== ADMIN_ROLE_NAME && role !== SUPER_ADMIN_ROLE_NAME) {
      return failureResponse(res, statusCodes.UNAUTHORIZED, 'You are not authorized to access this route.');
    }
    next();
  } catch (error) {
    if (debugLog) {
      console.log({ error });
    }
    return serverFailure(res);
  }
}

import jwt from 'jsonwebtoken';

/**
 *
 * @param {*} payload
 * @param {*} privateKey
 * @param {*} expiresIn
 * @returns {string} token
 */
// function that Generates a token
function generateJWTToken(payload, privateKey, expiresIn) {
  return jwt.sign(payload, privateKey, { expiresIn });
}

export default generateJWTToken;
require('dotenv').config();
// const jwt = require('jsonwebtoken');

// const generateZoomJWTTOKEN = () => {
//   const token = jwt.sign({
//         "iss": process.env.ZOOM_API_KEY,
//         // "exp": new Date(Date.now() + 60000)
//         "exp": new Date().getTime() + 30*60000
//     },
//     process.env.ZOOM_API_SECRET);
//     return token;
// };

// module.exports = generateZoomJWTTOKEN;
const bcrypt = require('bcrypt');

// compare the hashed reset token from the db with the token provided
const verifyToken = async (newToken, userResetToken) => {
  const tokenCompare = await bcrypt.compare(newToken, userResetToken);
  console.log('::::', tokenCompare);
  return tokenCompare;
};

// encrypt the new password
const encryptPassword = async (password) => {
  const encryptedPassword = await bcrypt.hashSync(password, 10);
  console.log('::::', encryptedPassword);
  return encryptedPassword;
};

export {
  verifyToken,
  encryptPassword,
};

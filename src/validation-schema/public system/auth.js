/* eslint-disable import/prefer-default-export */
import joi from 'joi';

/**
 * @abstract ! - means required
 * @param {*} - {email !, password !}
 * @returns validation schema
 */

export const validateCreateUserDetails = (obj) => {
  const schema = joi.object().keys({
    firstName: joi.string().error(() => new Error('Please provide first name')),
    lastName: joi.string().error(() => new Error('Please provide last name')),
    email: joi.string().email({ tlds: { allow: false } }).error(() => new Error('Please provide a valid email address')),
    password: joi.string().min(7).error(() => new Error('Please provide a password not less than 7 characters')),
    userRoleId: joi.string().error(() => new Error('Please provide a user role Id')),
  });

  return schema.validate(obj);
};

export const validateUserLogin = (obj) => {
  const schema = joi.object().keys({
    email: joi.string().email().required().error((errors) => new Error('Please provide a valid email address; address@example.com')),
    password: joi.string().required().error((errors) => new Error('Password must be provided')),
  });

  return schema.validate(obj);
};

export const validateUserPassword = (obj) => {
  const schema = joi.object().keys({
    password: joi.string().required().error((errors) => new Error('Password must be provided')),
  });

  return schema.validate(obj);
};

export const validateUserEmail = (obj) => {
  const schema = joi.object().keys({
    email: joi.string().email().required().error((errors) => new Error('Please provide a valid email address; address@example.com')),
  });

  return schema.validate(obj);
};

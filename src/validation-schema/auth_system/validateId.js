/* eslint-disable import/prefer-default-export */
import joi from 'joi';

/**
 * @abstract ! - means required
 * @param {*} - {id}
 * @returns validation schema
 */
export const validateId = (obj) => {
  const schema = joi.object().keys({
    id: joi.string().required().guid({ version: ['uuidv4', 'uuidv5'] }).error(() => new Error('Please provide a valid uuid as id')),
  });
  return schema.validate(obj);
};

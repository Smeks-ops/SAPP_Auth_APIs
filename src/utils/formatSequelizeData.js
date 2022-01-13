/**
 *
 * @param {*} object
 * @description it removes all extra data / metadata sequelize returns when querying
 * @returns object
 */

export default function formatSequelizeData(sequelizeData) {
  const stringifyData = JSON.stringify(sequelizeData);
  return JSON.parse(stringifyData);
}

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(async () => {
    const userRole = await queryInterface.sequelize.query('SELECT * FROM "userRole"',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      });

    if (!userRole || !userRole.length) {
      // create a super admin
      const seededUserRole = await queryInterface.bulkInsert('userRole', [
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          name: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          name: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});

      return seededUserRole;
    }
  }),

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('userRole', null, {});
  },
};

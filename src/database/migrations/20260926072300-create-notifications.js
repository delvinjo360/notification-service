'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      content: { type: Sequelize.TEXT, allowNull: false },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      channel: {
        type: Sequelize.ARRAY(
          Sequelize.ENUM('IN-APP', 'E-MAIL', 'SMS', 'PUSH'),
        ),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED'),
        allowNull: false,
        defaultValue: 'PENDING',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('notifications');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_notifications_channel";',
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_notifications_status";',
    );
  },
};

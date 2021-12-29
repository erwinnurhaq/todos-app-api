'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Todo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      activity_group_id: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.ENUM('very-low', 'low', 'normal', 'high', 'very-high'),
        allowNull: false,
        defaultValue: 'very-high'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Todo');
  }
};

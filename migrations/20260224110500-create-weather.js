'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('weather', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      temperature: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      minTemp: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      maxTemp: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('weather');
  }
};
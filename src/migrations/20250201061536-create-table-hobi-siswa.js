'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('hobi_siswa', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      kesenian: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      olahraga: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      organisasi: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      lain_lain: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('hobi_siswa')
  }
};

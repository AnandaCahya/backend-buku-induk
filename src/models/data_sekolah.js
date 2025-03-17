module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'data_sekolah',
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
      }
    }, {
    sequelize,
    tableName: 'data_sekolah',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'id' }]
      }
    ],
  });
}
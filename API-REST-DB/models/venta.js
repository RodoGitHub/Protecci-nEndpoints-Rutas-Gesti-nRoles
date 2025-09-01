'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Venta.belongsTo(models.Usuario, { foreignKey: 'usuarioId' })
      Venta.belongsTo(models.Producto, { foreignKey: 'productoId' })
    }
  }
  Venta.init({
    usuarioId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Venta',
  });
  return Venta;
};
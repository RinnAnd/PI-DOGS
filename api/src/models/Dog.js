const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minHeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxHeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lifeSpan: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    created: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },{timestamps: false});
};

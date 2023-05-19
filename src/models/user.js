'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const { saltRounds } = require('../config/serverConfig');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Roles,{
        through: 'User_Roles'
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [3,10]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    const hashedPassword = bcrypt.hashSync(user.password,saltRounds);
    user.password = hashedPassword;
  })

  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate({ Task }) {
      this.hasMany(Task, {foreignKey: 'user_id'})
    }
  }
  User.init({
    username: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.TEXT
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
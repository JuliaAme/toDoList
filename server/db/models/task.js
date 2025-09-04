'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ User }) {
     this.belongsTo(User, {foreignKey: 'user_id'})
   }
  }
  Task.init({
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.TEXT
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',  
        key: 'id'
      },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
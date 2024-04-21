"use strict";
const { v1: uuidv1 } = require("uuid");
uuidv1();

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
      },
      courseTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      courseCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    }
  );
  Course.associate = (models) => {
    Course.hasMany(models.Enrolment, { as: "enrolments", foreignKey: "courseId", targetKey: "courseId" });
  };
  return Course;
};
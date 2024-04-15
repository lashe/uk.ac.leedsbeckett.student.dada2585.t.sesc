"use strict";
const { v1: uuidv1 } = require("uuid");
uuidv1();

module.exports = (sequelize, DataTypes) => {
  const Enrolment = sequelize.define(
    "Enrolment",
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
      studentId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      courseId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    }
  );
  Enrolment.associate = (models) => {
    Enrolment.belongsTo(models.Student, {
        as: "students",
        foreignKey: "studentId",
        targetKey: "studentId",
      });
      Enrolment.belongsTo(models.Course, {
        as: "courses",
        foreignKey: "courseId",
        targetKey: "courseId",
      });
  };
  return Enrolment;
};
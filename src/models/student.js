"use strict";
const { v1: uuidv1 } = require("uuid");
uuidv1();

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
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
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      intake: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isSuspended: {
      	type: DataTypes.BOOLEAN,
      	defaultValue: false,
      	allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    }
  );
  Student.associate = (models) => {
    Student.hasOne(models.Enrolment, { as: "enrolment", foreignKey: "studentId" });
  };
  return Student;
};

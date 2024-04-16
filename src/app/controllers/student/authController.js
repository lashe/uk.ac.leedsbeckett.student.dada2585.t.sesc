var models = require("../../../models");
const { jsonS, jsonFailed } = require("../../../utils");
const bcrypt = require("bcryptjs");

let controller = {
    login: async (req, res)=> {
        const { studentId, password } = req.body
        const isStudent = await models.Student.findOne({ where: { studentId: studentId }});
        if(!isStudent){
            return jsonFailed(res, {}, "Invalid Credentials", 400);
        }
        let passwordIsValid = bcrypt.compareSync(
            password,
            isStudent.password
          );
          if (!passwordIsValid){
            return jsonFailed(res, {}, "Invalid Credentials", 400);
          }
          jsonS(res, 200, "Successfully logged in")
    }
    };
    module.exports = controller;
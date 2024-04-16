const models = require("../../../models");
const { jsonS, jsonFailed } = require("../../../utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../../config/jwt");

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
          req.session.user = isStudent;
          const data = controller.getToken(isStudent);
        return jsonS(res, 200, "Successful", data);
    },
    
    getToken: (user) => {
      let token = jwt.sign(
        { id: user.uuid, email: user.email, studentId: user.studentId },
        config.jwt_secret,
        {
          expiresIn: 2630000, // expires in 1 month
        }
      );
      let refreshToken = jwt.sign({ id: user.uuid, studentId: user.studentId }, config.jwt_secret);
      let data = {
      token: token,
      refreshToken: refreshToken,
      token_type: "jwt",
      expiresIn: 2630000,
    };
    return data;
    },

    refreshToken: (req, res) => {
      const { token } = req.body;
      jwt.verify(token, config.jwt_secret, async (err, decoded) => {
        if (err) {
          return jsonFailed(res, {}, "Token Expired", 403);
        }
        //
        let user = await models.Student.findOne({ studentId: decoded.studentId });
        const data = controller.getToken(user);
        return jsonS(res, 200, "Successful", data);
      });
    },

    logout: (req, res) => {
      if (req.session.user) {
        req.session.user = null;
        //
        return jsonS(res, null, "logged out successfully");
      }
      return jsonS(res, null, "logged out successfully");
    },
    };
    module.exports = controller;
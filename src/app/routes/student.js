const { StudentController, AuthController } = require("../controllers/student");

var student = require("express").Router();
// register
student.post("/register", StudentController.register);
student.post("/auth/login", AuthController.login);

// 404 response
student.get("**", function (req, res) {
  res.status(404).json({ error: "Resource not found" });
});

module.exports = student;

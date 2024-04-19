const { StudentController, AuthController } = require("../controllers/student");
const auth = require("../middlewares/studentAuth/authMiddleware");
const student = require("express").Router();
// register
student.post("/register", StudentController.register);
student.post("/auth/login", AuthController.login);
student.get("/profile", auth, StudentController.getProfile);
student.post("/profile", auth, StudentController.updateProfile);
student.get("/course", StudentController.viewCourses);
student.post("/enrol", auth, StudentController.enrolToCourse);
student.get("/enrolled/courses", auth, StudentController.getEnrolment);

// 404 response
student.get("**", function (req, res) {
  res.status(404).json({ error: "Resource not found" });
});

module.exports = student;

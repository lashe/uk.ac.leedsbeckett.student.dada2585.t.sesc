const { AdminController } = require("../controllers/admin");


const admin = require("express").Router();

admin.post("/course", AdminController.addCourse);

// 404 response
admin.get("**", function (req, res) {
    res.status(404).json({ error: "Resource not found" });
  });

module.exports = admin;
var models = require("../../../models");
const { jsonS, jsonFailed } = require("../../../utils");

let controller = {
    addCourse: async (req, res)=>{
        const { courseTitle, courseCode, amount } = req.body;
        await models.Course.create({
            courseCode,
            courseTitle,
            amount
        }).then((data)=>{
            return jsonS(res, 200, "successful", data);
        },
    (err)=>{
        console.error(err);
        return jsonFailed(res, {}, "error", 400);
    });
    }
};

module.exports = controller;
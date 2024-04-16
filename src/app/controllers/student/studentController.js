var models = require("../../../models");
const { jsonS, jsonFailed } = require("../../../utils");
const bcrypt = require("bcryptjs");

let controller = {
    register: async (req, res)=> {
        const { email, firstName, lastName, studentId, intake, dob, password } = req.body;
        try
        {
            let hashedPassword = bcrypt.hashSync(password, 8);
            const createStudent = await models.Student.create({ 
            email, 
            firstName, 
            lastName, 
            studentId, 
            intake, 
            dob, 
            password: hashedPassword });
        if(createStudent) {
            return jsonS(res, 200, "successful");
        }
        return jsonFailed(res, {}, "failed", 400);
    }
    catch(error){
        console.error(error);
    };
    }
    };
    module.exports = controller;

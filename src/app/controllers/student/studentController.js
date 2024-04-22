const models = require("../../../models");
const { jsonS, jsonFailed } = require("../../../utils");
const bcrypt = require("bcryptjs");
const { createAccount, createInvoice, getAllInvoice } = require("../../services/finance");
const { validateCourse } = require("../../services/validator");
const { createLibAccount } = require("../../services/library");

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
            const finance = await createAccount(studentId);
            await createLibAccount(studentId);
            return jsonS(res, 200, "successful", finance);
        }
        return jsonFailed(res, {}, "failed", 400);
    }
    catch(error){
        console.error(error);
    };
    },

    getProfile: async (req, res) => {
        const { studentId } = req.user;
        const getStudent = await models.Student.findOne({ 
            where: { studentId: studentId },
            attributes: ["studentId", "firstName", "lastName", "email", "intake"]
        });
        if(!getStudent){
            return jsonFailed(res, {}, "Profile Not Found", 404);
        }
        return jsonS(res, 200, "Profile", getStudent);
    },

    updateProfile: async (req, res) => {
        const { studentId } = req.user;
        const { firstName, lastName } = req.body;
        const updateStudent = await models.Student.update(
            {
                firstName,
                lastName
              },
              {
                where: {
                  studentId: studentId,
                },
              }
        );
        console.log(updateStudent);
        if(!updateStudent) {
            return jsonFailed(res, {}, "Error updating profile", 400);
        }
        return jsonS(res, 201, "Profile Updated");
    },


    enrolToCourse: async (req, res) => {
        const { studentId } = req.user;
        const { courseCode } = req.body;
        // validate student id

        // validate course id
        const isCourse = await validateCourse(courseCode);
        console.log(isCourse);
        if(!isCourse) {
            return jsonFailed(res, {}, "Course Does Not Exist", 404);
        }
        await models.Enrolment.create({
            studentId,
            courseCode
        }).then(async (course)=>{
            const today = new Date();
            const futureDate = new Date(today);
            futureDate.setDate(futureDate.getDate() + 30); 
            const invoice = {
                amount: 100,
            dueDate: futureDate,
            type: "TUITION_FEES",
            studentId
            };
            const invoiceData = await createInvoice(invoice);
            return jsonS(res, 201, "Enrolled to Course", invoiceData);
        }, (err)=>{
            console.error(err);
            return jsonFailed(res, {}, "error", 400);
        });
    },

    viewCourses: async (req, res) => {
        const getCourses = await models.Course.findAll();
        return jsonS(res, 200, "all courses", getCourses);
    },

    getEnrolment: async(req, res) =>{
        const { studentId } = req.user;
        const getallEnrolment = await models.Enrolment.findAll({ 
            where: { studentId: studentId },
            include: [
                {
                  model: models.Course,
                  as: "course",
                  attributes: [ "courseCode", "courseTitle" ],
                  required: true,
                },
              ],
        });
        if(!getallEnrolment){
            return jsonFailed(res, {}, "No Enrolment", 404);
        }
        return jsonS(res, 200, "Enrolments", getallEnrolment);
    },

    getAllInvoicesForAStudent: async (req, res) => {
        const { studentId } = req.user;
        const getInvoices = await getAllInvoice(studentId);
        if(!getInvoices) {
            return jsonFailed(res, {}, "Error Fetching Invoices", 404);
        }

        const data = getInvoices._embedded.invoiceList;
        return jsonS(res, 200, "successful", data);
    },

    graduationEligibility: async (req, res) => {
        const { studentId } = req.user;
        const getInvoices = await getAllInvoice(studentId);
        if(!getInvoices) {
            return jsonFailed(res, {}, "Error Getting Eligibility", 404);
        }
        const data = getInvoices._embedded.invoiceList;
        if(data.length > 0){
            return jsonFailed(res, {}, "Not Eligible for Graduation", 400);
        }
        return jsonS(res, 200, "Eligible for Graduation", data); 
    }
    
    };
    module.exports = controller;

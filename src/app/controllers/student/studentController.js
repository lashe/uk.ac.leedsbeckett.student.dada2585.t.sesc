const models = require("../../../models");
const { jsonS, jsonFailed } = require("../../../utils");
const bcrypt = require("bcryptjs");
const { createAccount, createInvoice, getAllInvoice } = require("../../services/finance");
const { validateCourse } = require("../../services/validator");
const { createLibAccount } = require("../../services/library");
const { createNewStudent, getStudentProfile, updateStudentProfile, enrolStudentToCourse, getAllStudentEnrolment } = require("../../services/student");

let controller = {
    // register new students
    register: async (req, res)=> {
        const { studentId } = req.body;
        const newStudent = await createNewStudent(req.body);
        if(newStudent) {
            const finance = await createAccount(studentId);
            await createLibAccount(studentId);
            return jsonS(res, 200, "successful", finance);
        }
        return jsonFailed(res, {}, "failed", 400);
    },

    // get student profile
    getProfile: async (req, res) => {
        const { studentId } = req.user;
        const student = await getStudentProfile(studentId);
        if(!student){
            return jsonFailed(res, {}, "Profile Not Found", 404);
        }
        return jsonS(res, 200, "Profile", student);
    },

    // update student profile
    updateProfile: async (req, res) => {
        const { studentId } = req.user;
        const updateStdProfile = updateStudentProfile(studentId, req.body);
        if(!updateStdProfile) {
            return jsonFailed(res, {}, "Error updating profile", 400);
        }
        return jsonS(res, 201, "Profile Updated");
    },


    // enroll unto a course
    enrolToCourse: async (req, res) => {
        const { studentId } = req.user;
        const { courseCode } = req.body;

        // validate course id
        const isCourse = await validateCourse(courseCode);
        if(!isCourse) {
            return jsonFailed(res, {}, "Course Does Not Exist", 404);
        }
        const courseEnrolment = await enrolStudentToCourse(studentId, courseCode);
        if(!courseEnrolment){
            return jsonFailed(res, {}, "error", 400);
        }
        return jsonS(res, 201, "Enrolled to Course", courseEnrolment);
    },

    // view all courses
    viewCourses: async (req, res) => {
        const getCourses = await models.Course.findAll();
        return jsonS(res, 200, "all courses", getCourses);
    },

    // get all courses a student is enrolled unto
    getEnrolment: async(req, res) =>{
        const { studentId } = req.user;
        const getEnrolments = await getAllStudentEnrolment(studentId);
        if(!getEnrolments){
            return jsonFailed(res, {}, "No Enrolment", 404);
        }
        return jsonS(res, 200, "Enrolments", getEnrolments);
    },

    // get all outstanding invoices for a student
    getAllInvoicesForAStudent: async (req, res) => {
        const { studentId } = req.user;
        const getInvoices = await getAllInvoice(studentId);
        if(!getInvoices) {
            return jsonFailed(res, {}, "Error Fetching Invoices", 404);
        }

        const data = getInvoices?._embedded?.invoiceList;
        return jsonS(res, 200, "successful", data);
    },

    // check graduation eligibility
    graduationEligibility: async (req, res) => {
        const { studentId } = req.user;
        const getInvoices = await getAllInvoice(studentId);
        if(!getInvoices) {
            return jsonFailed(res, {}, "Error Getting Eligibility", 404);
        }
        const data = getInvoices?._embedded?.invoiceList;
        if(data && data.length > 0){
            return jsonFailed(res, {}, "Not Eligible for Graduation", 400);
        }
        return jsonS(res, 200, "Eligible for Graduation", data); 
    }
    
    };
    module.exports = controller;

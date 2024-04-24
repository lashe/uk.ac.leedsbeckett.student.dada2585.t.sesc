const models = require("../../models");
const bcrypt = require("bcryptjs");
const { createInvoice } = require("./finance");

// method for adding new sdtudent to database
const createNewStudent = async (studentData) =>{
    const { email, firstName, lastName, studentId, intake, dob, password } = studentData;
    let hashedPassword = bcrypt.hashSync(password, 8);
    const createStudent = await models.Student.create({ 
    email, 
    firstName, 
    lastName, 
    studentId, 
    intake, 
    dob, 
    password: hashedPassword 
});
if(!createStudent){
    return null
}
return createStudent;
        
};

// get student profile from database
const getStudentProfile = async (studentId)=>{
    const getStudent = await models.Student.findOne({ 
        where: { studentId: studentId },
        attributes: ["studentId", "firstName", "lastName", "email", "intake"]
    });
    if(!getStudent){
        return null;
    }
    return getStudent;
};

// update student profile
const updateStudentProfile = async (studentId, studentData)=>{
    const updateStudent = await models.Student.update(
        {
            firstName: studentData.firstName,
            lastName: studentData.lastName
          },
          {
            where: {
              studentId: studentId,
            },
          }
    );
    if(!updateStudent) {
        return false;
    }
    return true;
};

// enrol a student to a course
const enrolStudentToCourse = async (studentId, courseCode) =>{
    const isEnrolled = await models.Enrolment.findOne({ where: { studentId, courseCode}});
    if(isEnrolled){
        return ({message: "already enrolled"});
    }
    await models.Enrolment.create({
        studentId,
        courseCode
    }).then(async (course)=>{
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(futureDate.getDate() + 30); 

        // invoice body
        const invoice = {
            amount: 100,
        dueDate: futureDate,
        type: "TUITION_FEES",
        studentId
        };
        
        // create invoice for course
        const invoiceData = await createInvoice(invoice);
        return invoiceData;
    }, (err)=>{
        console.error(err);
        return null;
    });
};

// return all courses a student is enrolled to
const getAllStudentEnrolment = async (studentId)=>{
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
        return null;
    }
    return getallEnrolment;
}

module.exports = {
    createNewStudent,
    getStudentProfile,
    updateStudentProfile,
    enrolStudentToCourse,
    getAllStudentEnrolment
}
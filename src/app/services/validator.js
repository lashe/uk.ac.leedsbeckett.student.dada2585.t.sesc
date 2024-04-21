const models = require("../../models");

const validateStudent = (studentId) =>{
    models.Student.findOne({ where: {studentId: studentId }}).then(()=>{
        return true;
    }, 
    (err)=>{
        console.error;
        return false
    });
};

const validateCourse = async (courseCode) =>{
    const getCourse = await models.Course.findOne({ where: {courseCode: courseCode}});
    if(!getCourse){
        return null
    }
    return getCourse;
    // await models.Course.findOne({ where: { courseCode: courseCode }}).then( async (course)=>{
    //     return course;
    // }, 
    // (err)=>{
    //     console.error;
    //     return null;
    // });
};

module.exports = {
    validateCourse,
    validateStudent
}
const { createNewStudent, getStudentProfile } = require("../app/services/student");


test('Create Student and getUserById integration test', async () => {
    // Create a Student
    const data = { 
        email: "thisisatest@mail.com",
        firstName: "test",
        lastName: "subject",
        studentId: "testid",
        intake: "2024/2025",
        password: "anothertest"
    };
    const student = await createNewStudent(data);
    
    // Assertions
    expect(student).toBeDefined();
});

test('get Student Profile integration test', async () => {
    const studentId = "c7370203"
    // Retrieve the Student by ID
    const retrievedProfile = await getStudentProfile(studentId);

    // Assertions
    expect(retrievedProfile).toBeDefined();
    expect(retrievedProfile.studentId).toEqual(retrievedProfile.studentId);
});

test('get Student Profile integration test', async () => {
    const studentId = "c7370203"
    // Retrieve the Student by ID
    const retrievedProfile = await getStudentProfile(studentId);

    // Assertions
    expect(retrievedProfile).toBeDefined();
    expect(retrievedProfile.studentId).toEqual(retrievedProfile.studentId);
});
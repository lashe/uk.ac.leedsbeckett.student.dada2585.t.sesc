const { createNewStudent, getStudentProfile } = require("../app/services/student");


test('Create Student and getUserById integration test', async () => {
    // Create a Student
    const data = { 
        email,
        firstName,
        lastName,
        studentId,
        intake,
        dob,
        password
    };
    const student = await createNewStudent({ name: 'Test User' });
    
    // Retrieve the Student by ID
    const retrievedUser = await getStudentProfile(student.studentId);

    // Assertions
    expect(student).toBeDefined();
    expect(retrievedUser).toBeDefined();
    expect(retrievedUser.id).toEqual(student.studentId);
    expect(retrievedUser.name).toEqual('Test User');
});

test('get Student Profile integration test', async () => {
    // Retrieve the Student by ID
    const retrievedUser = await getStudentProfile(student.studentId);

    // Assertions
    expect(student).toBeDefined();
    expect(retrievedUser).toBeDefined();
    expect(retrievedUser.id).toEqual(student.studentId);
    expect(retrievedUser.name).toEqual('Test User');
});
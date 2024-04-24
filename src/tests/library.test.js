const { createLibAccount } = require("../app/services/library");


test('Create Student Library account integration test', async () => {
    // Create a Student
    const studentId = "cxxxxxxxx"
    const student = await createLibAccount(studentId);
    
    // Assertions
    expect(student).toBeDefined();
});

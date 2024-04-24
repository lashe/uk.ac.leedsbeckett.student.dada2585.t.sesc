const { createAccount, getAllInvoice } = require("../app/services/finance");

test('Create Student Finance account integration test', async () => {
    // Create a Student
    const studentId = "cxxxxxxxx"
    const student = await createAccount(studentId);
    
    // Assertions
    expect(student).toBeDefined();
});

test('get all invoices for a Student integration test', async () => {
    // Create a Student
    const studentId = "cxxxxxxxx"
    const student = await getAllInvoice(studentId);
    
    // Assertions
    expect(student).toBeDefined();
});
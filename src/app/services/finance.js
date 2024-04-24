const axios = require("axios");

// create a finance account for a student
const createAccount = async (studentId) =>{
    try {
        const response = await axios.post("http://localhost:8081/accounts/", {
            studentId,
          validateStatus: () => true,
        });
        if (response.status === 200) {
          const result = {
            code: response.status,
            ...response.data,
          };
          return result;
        }
        const result = {
          code: response.status,
          ...response.data,
        };
        return result;
      } catch (error) {
        console.error(error);
        return null;
      }
};

// create invoice for a course a student is enrolled on
const createInvoice = async (invoice) =>{
    try {
        const response = await axios.post("http://localhost:8081/invoices/", {
            amount: invoice.amount,
            dueDate: invoice.dueDate,
            type: invoice.type,
            account: {
                studentId: invoice.studentId
            },
          validateStatus: () => true,
        });
        if (response.status === 200) {
          const result = {
            code: response.status,
            ...response.data,
          };
          return result;
        }
        const result = {
          code: response.status,
          ...response.data,
        };
        return result;
      } catch (error) {
        console.error(error);
        return null;
      }
};

// get all outstanding invoices for a student from the finance microservice
const getAllInvoice = async (studentId) =>{
  try {
      const response = await axios.get(`http://localhost:8081/invoice/${studentId}`, {
        validateStatus: () => true,
      });
      if (response.status === 200) {
        const result = {
          code: response.status,
          ...response.data,
        };
        return result;
      }
      const result = {
        code: response.status,
        ...response.data,
      };
      return result;
    } catch (error) {
      console.error(error);
        return null;
    }
};

module.exports = {
    createAccount,
    createInvoice,
    getAllInvoice
}
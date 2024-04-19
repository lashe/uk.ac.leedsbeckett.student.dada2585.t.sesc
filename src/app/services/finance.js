const axios = require("axios");

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
        console.error(`${TAG}::${String(error)}`);
        return null;
      }
};
module.exports = {
    createAccount,
    createInvoice
}
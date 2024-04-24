const axios = require("axios");

// create a student account on the library microservice
const createLibAccount = async (studentId)=>{
    try {
        const response = await axios.post("http://localhost:8082/api/register", {
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

module.exports = {
    createLibAccount
}
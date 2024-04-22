const axios = require("axios");

const createLibAccount = async (studentId)=>{
    try {
        const response = await axios.post("http://localhost/api/register", {
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
        console.error(`${TAG}::${String(error)}`);
        return null;
      }
};

module.exports = {
    createLibAccount
}
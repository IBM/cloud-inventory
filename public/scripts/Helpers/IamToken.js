const { iamApi } = require("../Helpers/Api");

// Gera o Bearer Token
const getToken = (apiKey) => {
  return iamApi
    .post(
      `/token?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`
    )
    .then((res) => {
      return res.data.access_token;
    })
    .catch((err) => {
      return err;
    });
};

module.exports = {
  getToken,
};

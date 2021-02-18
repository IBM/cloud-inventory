const { iamApi } = require("../Helpers/Api");

// Gera o Bearer Token
const getToken = (event, apiKey) => {
  return iamApi
    .post(
      `/token?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`
    )
    .then((response) => {
      return response.data.access_token;
    })
    .catch((error) => {
      event.sender.send("notification", {
        kind: "error",
        title: `Error ${error.response.status}: ${error.response.statusText}`,
        description: error.response.data.errorMessage,
        caption: new Date().toLocaleTimeString(),
      });
      return null;
    });
};

module.exports = {
  getToken,
};

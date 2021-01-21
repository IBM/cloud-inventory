const axios = require("axios");

const api = axios.default.create({
  baseURL: "https://api.softlayer.com/rest/v3.1/",
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = { api };

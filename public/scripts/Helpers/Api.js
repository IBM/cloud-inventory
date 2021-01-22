const axios = require("axios");

const iamApi = axios.default.create({
  baseURL: "https://iam.cloud.ibm.com/identity/token",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
  params: {
    grant_type: "urn:ibm:params:oauth:grant-type:apikey",
  },
});

const classicApi = axios.default.create({
  baseURL: "https://api.softlayer.com/rest/v3.1/",
  headers: {
    "Content-Type": "application/json",
  },
});

const vpcApi = [
  //US South (Dallas)
  axios.default.create({
    baseURL: "https://us-south.iaas.cloud.ibm.com/",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  //US East (Washington DC)
  axios.default.create({
    baseURL: "https://us-east.iaas.cloud.ibm.com",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  //United Kingdom (London)
  axios.default.create({
    baseURL: "https://eu-gb.iaas.cloud.ibm.com",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  //EU Germany (Frankfurt)
  axios.default.create({
    baseURL: "https://eu-de.iaas.cloud.ibm.com",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  //Japan (Tokyo)
  axios.default.create({
    baseURL: "https://jp-tok.iaas.cloud.ibm.com",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  //Australia (Sydney)
  axios.default.create({
    baseURL: "https://au-syd.iaas.cloud.ibm.com",
    headers: {
      "Content-Type": "application/json",
    },
  }),
];

module.exports = { iamApi, classicApi, vpcApi };

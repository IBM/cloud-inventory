const axios = require("axios");

const iamApi = axios.default.create({
  baseURL: "https://iam.cloud.ibm.com/identity",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});

const classicApi = axios.default.create({
  baseURL: "https://api.softlayer.com/rest/v3.1/",
  headers: {
    "Content-Type": "application/json",
  },
});

const resourceControllerApi = axios.default.create({
  baseURL: "https://resource-controller.cloud.ibm.com/v2/",
  headers: {
    "Content-Type": "application/json",
  },
});

const vpcApi = [
  //US South (Dallas)
  {
    api: axios.default.create({
      baseURL: "https://us-south.iaas.cloud.ibm.com/",
      headers: {
        "Content-Type": "application/json",
      },
    }),
    location: "US South (Dallas)",
  },
  //US East (Washington DC)
  {
    api: axios.default.create({
      baseURL: "https://us-east.iaas.cloud.ibm.com",
      headers: {
        "Content-Type": "application/json",
      },
    }),
    location: "US East (Washington DC)",
  },
  //United Kingdom (London)
  {
    api: axios.default.create({
      baseURL: "https://eu-gb.iaas.cloud.ibm.com",
      headers: {
        "Content-Type": "application/json",
      },
    }),
    location: "United Kingdom (London)",
  },
  //EU Germany (Frankfurt)
  {
    api: axios.default.create({
      baseURL: "https://eu-de.iaas.cloud.ibm.com",
      headers: {
        "Content-Type": "application/json",
      },
    }),
    location: "EU Germany (Frankfurt)",
  },
  //Japan (Tokyo)
  {
    api: axios.default.create({
      baseURL: "https://jp-tok.iaas.cloud.ibm.com",
      headers: {
        "Content-Type": "application/json",
      },
    }),
    location: "Japan (Tokyo)",
  },
  //Australia (Sydney)
  {
    api: axios.default.create({
      baseURL: "https://au-syd.iaas.cloud.ibm.com",
      headers: {
        "Content-Type": "application/json",
      },
    }),
    location: "Australia (Sydney)",
  },
];

module.exports = { iamApi, classicApi, vpcApi, resourceControllerApi };

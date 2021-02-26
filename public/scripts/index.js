module.exports = require("./Account/AddAcount");
module.exports = require("./Account/GetAccounts");
module.exports = require("./Helpers/Archive");
module.exports = require("./Export/Excel/Export");
module.exports = require("./Export/PDF");

// Classic Infra Imports
module.exports = require("./Services/Classic/VirtualServer");
module.exports = require("./Services/Classic/BareMetal");
module.exports = require("./Services/Classic/GatewayAppliance");
module.exports = require("./Services/Classic/BlockStorage");
module.exports = require("./Services/Classic/FileStorage");
module.exports = require("./Services/Classic/ObjectStorage");

// VPC Imports
module.exports = require("./Services/VPC/Overview");
module.exports = require("./Services/VPC/VirtualServer");
module.exports = require("./Services/VPC/Subnet");

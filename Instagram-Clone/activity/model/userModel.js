const db = require("../utility/connection.js");
let{createEntityFact,getEntityFact,updateEntityFact,deleteEntityFact}=require("../utility/modelFactory");
const create = createEntityFact("user");
const getById=getEntityFact("user")
const updateById=updateEntityFact("user");
const deleteById=deleteEntityFact("user");
module.exports.deleteById=deleteById;
module.exports.updateById=updateById;
module.exports.create=create;
module.exports.getById=getById;
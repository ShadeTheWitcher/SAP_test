//const cds = require("@sap/cds");
//const { Students } = cds.entities("myCompany.hr.lms");

module.exports = srv => {

  srv.before("CREATE", "InsertStudent", async (req,res) => {  //se ejecutara dps de insertar
    //checks email are not personal gmail
    if(typeof req.data.email === 'undefined') req.error(500,'Email Missing');

    if(req.data.email.toLowerCase().indexof("gmail") !== -1){
        req.error(500, "Personal Email Id Not allowed");
    }

  });
};
const cds = require("@sap/cds");
const { Students } = cds.entities("myCompany.hr.lms");

module.exports = srv => {
  if (!Students) {
    console.error("❌ ERROR: La entidad 'Students' no está definida en el servicio.");
    return;
  }

  srv.on("READ", "StudentsSRV", async (req) => {  // Hacemos la función async
    const { SELECT } = cds.ql;
    const result = await SELECT.from(Students) // Obtenemos todos los estudiantes
    console.log(result); // Imprimimos los resultados en la consola
    return result;
  });


// ---------------------------------------------------------------------------------------------------------------------------

  
  //Usando filtros en la consulta
  // url http://localhost:4004/odata/v4/mysrvdemo/StudentsSRV2(email='demo@demo.com')
  srv.on("READ", "StudentsSRV2", async (req) => {  // Hacemos la función async
    const { SELECT } = cds.ql;

    // Inspeccionar req.params para capturar filtros directamente
    console.log("Request params:", req.params);

    // Inspeccionar req.query para entender qué filtros llegan
    console.log("Request query:", req.query);

    const aFilter = req.query.SELECT.where;
    console.log("Filter applied:", aFilter);


    if (typeof aFilter === 'undefined') {
      let tempResult = await SELECT.from(Students).limit(2); // Obtenemos todos los estudiantes
      //tempResult = tempResult.filter(row => row.first_name === "john");
      console.log("Result without filter:", tempResult);
      return tempResult;
    }
    
    const result = await SELECT.from(Students).where({
      email: "ajay@demo.com"
    }); // Obtenemos todos los estudiantes
    console.log(result); // Imprimimos los resultados en la consola
    return result;

    // const { email } = req.data;  // Extraemos el email desde la key
    // console.log("Email filter:", email);

    // const result = await SELECT.from(Students).where({ email });
    // console.log(result);
    // return result;
  });



  srv.on('READ', 'GetStudent', async (req) => {
    console.log('GET request received for GetStudent');  // Log para asegurarte de que la solicitud se recibe
    const {SELECT} = cds.ql;
    const aFilter = req.query.SELECT?.where;
  
    if (aFilter) {
      console.log('Filter applied:', aFilter);  // Log de los filtros
      return await SELECT.from(Students).where(aFilter);
    }
    return await SELECT.from(Students);
  });

  srv.after("READ", "GetStudent", data => {
    return data.map(d => {
      //d.first_name = d.first_name + " " + d.last_name;
      return d;
    });
  });

  srv.on("CREATE", "UpdateStudent", async (req, res) => {
    let firstName = req.data.first_name;
    let lastName = req.data.last_name;
    let returnData = await cds
      .transaction(req)
      .run([
        UPDATE(Students)
          .set({
            first_name: firstName
          })
          .where({ first_name: "Mr. " + firstName }),
        UPDATE(Students)
          .set({
            last_name: "randomLast"
          })
          .where({ last_name: lastName })
      ])
      .then((resolve, reject) => {
        console.log("resolve:", resolve);
        console.log("reject:", reject);

        if (typeof resolve !== "undefined") {
          return req.data;
        } else {
          req.error(409, "Record Not Found");
        }
      })
      .catch(err => {
        console.log(err);
        req.error(500, "Error in Updating Record");
      });
    console.log("Before End", returnData);
    return returnData;
  });

  srv.on("CREATE", "InsertStudent", async (req, res) => {
    let returnData = await cds
      .transaction(req)
      .run(
        INSERT.into(Students).entries({
          email: req.data.email,
          first_name: req.data.first_name,
          last_name: req.data.last_name,
          date_sign_up: req.data.date_sign_up
        })
      )
      .then((resolve, reject) => {
        console.log("resolve:", resolve);
        console.log("reject:", reject);

        if (typeof resolve !== "undefined") {
          return req.data;
        } else {
          req.error(409, "Record Not Found");
        }
      })
      .catch(err => {
        console.log(err);
        req.error(500, "Error in Updating Record");
      });
    console.log("Before End", returnData);
    return returnData;
  });

  srv.on("CREATE", "DeleteStudent", async (req, res) => {
    let returnData = await cds
      .transaction(req)
      .run(
        DELETE.from(Students).where({
          email: req.data.email
        })
      )
      .then((resolve, reject) => {
        console.log("resolve:", resolve);
        console.log("reject:", reject);

        if (typeof resolve !== "undefined") {
          return req.data;
        } else {
          req.error(409, "Record Not Found");
        }
      })
      .catch(err => {
        console.log(err);
        req.error(500, "Error in Updating Record");
      });
    console.log("Before End", returnData);
    return returnData;
  });
};

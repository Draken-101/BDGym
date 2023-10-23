module.exports = app => {
    const empleados = require("../controllers/empleado.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", empleados.create);
  
    // Retrieve all empleados
    router.get("/", empleados.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", empleados.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", empleados.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", empleados.delete);
  
    // Delete all empleados
    router.delete("/", empleados.deleteAll);
  
    app.use('/api/empleados', router);
  };
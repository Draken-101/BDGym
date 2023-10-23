module.exports = app => {
    const productos = require("../controllers/producto.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", productos.create);
  
    // Retrieve all productos
    router.get("/", productos.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", productos.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", productos.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", productos.delete);
  
    // Delete all productos
    router.delete("/", productos.deleteAll);
  
    app.use('/api/productos', router);
  };
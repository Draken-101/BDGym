const Empleado = require("../models/empleado.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const empleado = new Empleado({
    nombre: req.body.nombre,
    edad: req.body.edad,
    peso: req.body.peso,
    perfil: req.body.perfil,
    membresia: req.body.membresia
  });

  // Save Tutorial in the database
  Empleado.create(empleado, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Empleado.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single Tutorial by Id
exports.findOne = (req, res) => {
  Empleado.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Empleado with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Empleado with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Empleado.updateById(
    req.params.id,
    new Empleado(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Empleado with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Empleado with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Empleado.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Empleado with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Empleado with id " + req.params.id
        });
      }
    } else res.send({ message: `Empleado was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Empleado.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all empleados."
      });
    else res.send({ message: `All empleados were deleted successfully!` });
  });
};

const sql = require("./db.js");

// constructor
const Empleado = function(empleado) {
  this.nombre = empleado.nombre;
  this.edad = empleado.edad;
  this.peso = empleado.peso;
  this.perfil = empleado.perfil;
  this.membresia = empleado.membresia;
};

Empleado.create = (newEmpleado, result) => {
  sql.query("INSERT INTO empleados SET ?", newEmpleado, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Empleado: ", { id: res.insertId, ...newEmpleado });
    result(null, { id: res.insertId, ...newEmpleado });
  });
};

Empleado.findById = (id, result) => {
  sql.query(`SELECT * FROM empleados WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found empleado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Empleado.getAll = (nombre, result) => {
  let query = "SELECT * FROM empleados";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("empleados: ", res);
    result(null, res);
  });
};

Empleado.updateById = (id, empleado, result) => {
  sql.query(
    "UPDATE empleados SET nombre = ?, edad = ?, peso = ?, perfil = ?, membresia = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Empleado.remove = (id, result) => {
  sql.query("DELETE FROM empleados WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted empleado with id: ", id);
    result(null, res);
  });
};

Empleado.removeAll = result => {
  sql.query("DELETE FROM empleados", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} empleados`);
    result(null, res);
  });
};

module.exports = Empleado;

const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "",
  password: "",
  database: "tutorias",
});

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

app.post("/alumno/agregar", (req, res) => {
  const {
    matricula,
    aPaterno,
    aMaterno,
    nombre,
    sexo,
    dCalle,
    dNumero,
    dColonia,
    dCodigoPostal,
    aTelefono,
    aCorreo,
    aFacebook,
    aInstagram,
  } = req.body;

  const sql = "insert into alumnos values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [
      matricula,
      aPaterno,
      aMaterno,
      nombre,
      sexo,
      dCalle,
      dNumero,
      dColonia,
      dCodigoPostal,
      aTelefono,
      aCorreo,
      aFacebook,
      aInstagram,
      "default.jpg",
    ],
    (err, result) => {
      if (err) {
        res.send({
          status: 100,
          errNo: err.errno,
          mensaje: err.sqlMessage,
          codigo: err.code,
        });
      } else {
        res.send({
          status: 200,
        });
      }
    }
  );
});

app.get("/alumnos", (req, res) => {
  const sql = "select * from alumnos";
  db.query(sql, (err, result) => {
    if (err) {
      res.send({
        status: 100,
        errNo: err.errno,
        mensaje: err.sqlMessage,
        codigo: err.code,
      });
    } else {
      res.send({
        status: 200,
        result,
      });
    }
  });
});

app.post("/alumno/modificar", (req, res) => {
  const {
    matricula,
    aPaterno,
    aMaterno,
    nombre,
    sexo,
    dCalle,
    dNumero,
    dColonia,
    dCodigoPostal,
    aTelefono,
    aCorreo,
    aFacebook,
    aInstagram,
  } = req.body;

  const sql =
    "update alumnos set aPaterno=?, aMaterno=?, nombre=?, sexo=?, dCalle=?, dNumero=?, dColonia=?, dCodigoPostal=?, aTelefono=?, aCorreo=?, aFacebook=?, aInstagram=? where matricula=?";

  db.query(
    sql,
    [
      aPaterno,
      aMaterno,
      nombre,
      sexo,
      dCalle,
      dNumero,
      dColonia,
      dCodigoPostal,
      aTelefono,
      aCorreo,
      aFacebook,
      aInstagram,
      matricula,
    ],
    (err, result) => {
      if (err) {
        res.send({
          status: 100,
          errNo: err.errno,
          mensaje: err.sqlMessage,
          codigo: err.code,
        });
      } else {
        res.send({
          status: 200,
          result,
        });
      }
    }
  );
});

app.post("/alumno/eliminar", (req, res) => {
  const { matricula } = req.body;

  const sql = "delete from alumnos where matricula=?";

  db.query(sql, [matricula], (err, result) => {
    if (err) {
      res.send({
        status: 100,
        errNo: err.errno,
        mensaje: err.sqlMessage,
        codigo: err.code,
      });
    } else {
      res.send({
        status: 200,
        result,
      });
    }
  });
});

app.get("/alumno/:matricula", (req, res) => {
  const matricula = req.params.matricula;

  const sqlGet = "select * from alumnos where matricula=?";
  db.query(sqlGet, [matricula], (err, result, fields) => {
    if (err) {
      res.send({
        status: 100,
        errNo: err.errno,
        mensaje: err.sqlMessage,
        codigo: err.code,
      });
    } else {
      res.send({
        status: 200,
        result,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`escuchando en el puerto ${port}`);
});
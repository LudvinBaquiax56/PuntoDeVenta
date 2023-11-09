'use strict';

const db = require("../../models");
const Usuario = db.usuarios;
const { QueryTypes } = require('sequelize');

module.exports = {

  async Login(req, res) {
    try {
     const { usuario, contrasena } = req.body;
     console.log(usuario, contrasena);
      const datos = await Usuario.sequelize.query("CALL SP_Usuarios_Login(:usuario,:contrasena);", {
        replacements: {usuario, contrasena},
        type: QueryTypes.SELECT,
        model: Usuario,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  },
};
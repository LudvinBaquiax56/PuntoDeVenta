'use strict';

const db = require("../../models");
const Usuario = db.usuarios;
const { QueryTypes } = require('sequelize');

module.exports = {

  async General(req, res) {
    try {
      const datos = await Usuario.sequelize.query("SELECT * FROM VW_Usuarios_General", {
        type: QueryTypes.SELECT,
        model: Usuario,
      });
      console.log(JSON.stringify(datos));
      res.status(200).json(datos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
    }
  }
};
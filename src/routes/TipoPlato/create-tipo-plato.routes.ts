import express from 'express';
import TipoPlato from '../../models/TipoPlato';
import CreateControllersTipoPlato from '../../controllers/tipo-plato/create-tipo-plato';
import validarToken from '../validarToken';

const crateTipoPlatoRoute = express.Router();
crateTipoPlatoRoute.use(validarToken);

crateTipoPlatoRoute.post('/createtipoplato', async (req, res, next) => {
  const { Nombre, Descripcion, IdUsuario } = req.body;
  try {
    const newTipoPlato = new TipoPlato(Nombre, Descripcion, IdUsuario);
    const result = await CreateControllersTipoPlato.createTipoPlato(newTipoPlato);
    res.status(201).json({ results: result, message: 'Tipo de plato creado exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ results: null, message: 'Hubo un error al crear tipo de plato' });
  }
});

export default crateTipoPlatoRoute;

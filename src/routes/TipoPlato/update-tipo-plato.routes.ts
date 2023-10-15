import express from 'express';
import TipoPlato from '../../models/TipoPlato';
import CreateControllersTipoPlato from '../../controllers/tipo-plato/create-tipo-plato';
import UpdateControllersTipoPlato from '../../controllers/tipo-plato/update-tipo-plato';
import validarToken from '../validarToken';

const updateTipoPlatoRoute = express.Router();
updateTipoPlatoRoute.use(validarToken);

updateTipoPlatoRoute.put('/updatetipoplato/:id', async (req, res, next) => {
  const {Nombre, Descripcion, IdUsuario} = req.body;
  const tipoPlatoID = parseInt(req.params.id);

  try {
    const newTipoPlato = new TipoPlato(Nombre, Descripcion, IdUsuario,tipoPlatoID);
    const result = await UpdateControllersTipoPlato.updateTipoPlato(newTipoPlato);
    res.status(201).json({ result: result, message: 'Tipo de plato actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({result:null, message: error  });
  }
});

export default updateTipoPlatoRoute;

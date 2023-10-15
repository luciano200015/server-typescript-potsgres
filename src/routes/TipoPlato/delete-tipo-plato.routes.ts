import express from 'express';
import DeleteControllersTipoPlato from '../../controllers/tipo-plato/delete-tipo-plato';
import validarToken from '../validarToken';

const deleteTipoPlatoRoute = express.Router();
deleteTipoPlatoRoute.use(validarToken);

deleteTipoPlatoRoute.delete('/deletetipoplato/:id', async (req, res, next) => {
  const tipoPlatoID = parseInt(req.params.id);
  try {
    const result = await DeleteControllersTipoPlato.deleteTipoPlato(tipoPlatoID);
    res.status(200).json({ result:result, message: 'Tipo de plato eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ result: null, message: error });
  }
});

export default deleteTipoPlatoRoute;

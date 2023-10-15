import express from 'express';
import DeletePlatoController from '../../controllers/plato/delete-plato';
import validarToken from '../validarToken';

const deletePlatoRoute = express.Router();
deletePlatoRoute.use(validarToken);

deletePlatoRoute.delete('/deleteplato/:id', async (req, res, next) => {
  const platoID = parseInt(req.params.id);
  try {
    const result = await DeletePlatoController.deletePlato(platoID);
    res.status(200).json({ result: result, message: 'Plato eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ result: null, message: error });
  }
});

export default deletePlatoRoute;

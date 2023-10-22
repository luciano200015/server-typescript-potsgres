import express from 'express';
import validarToken from '../../validarToken';
import ListaControllerPlato from '../../controllers/plato/lista-platos';

const obtenePlatoRoute = express.Router();
obtenePlatoRoute.use(validarToken);

obtenePlatoRoute.get('/obtenerplatos', async (req, res) => {
  try {
    const results = await ListaControllerPlato.obtenerListaPlatos();
    res.status(200).json({
      message: "Lista Platos obtenido con éxito",
      results: results.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error, results: null });
  }
});

export default obtenePlatoRoute;

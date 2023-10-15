import express from 'express';
import validarToken from '../../validarToken';
import ListaControllerTipoPlato from '../../controllers/tipo-plato/lista-tipo-platos';

const obteneTipoPlatoRoute = express.Router();
obteneTipoPlatoRoute.use(validarToken);

obteneTipoPlatoRoute.get('/obtenertipoplato', async (req, res) => {
  try {
    const results = await ListaControllerTipoPlato.obtenerListaTipoPlato();
    res.status(200).json({
      message: "Tipos Platos obtenido con éxito",
      results: results.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error,results:null });
  }
});

export default obteneTipoPlatoRoute;

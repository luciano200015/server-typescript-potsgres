import express from 'express';
import ServicioController from '../../controllers/servicio/controller.servicio';


const ServiciotoRouteSinToken = express.Router();



ServiciotoRouteSinToken.get('/obtenerservicios', async (req, res) => {
  try {
    const results = await ServicioController.obtenerListaServiciosPorFechaSinToken();
    res.status(200).json({
      message: "Lista de servicios obtenido con éxito",
      results: results.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error, results: null });
  }
});

export default ServiciotoRouteSinToken;

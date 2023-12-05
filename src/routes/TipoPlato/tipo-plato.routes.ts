import express from 'express';
import TipoPlato from '../../models/TipoPlato';
import validarToken from '../validarToken';
import ControllersTipoPlato from '../../controllers/tipo-plato/controller.tipo-plato';

const TipoPlatoRoute = express.Router();
TipoPlatoRoute.use(validarToken);

TipoPlatoRoute.post('/createtipoplato', async (req, res, next) => {
  const { Nombre, Descripcion, IdUsuario } = req.body;
  try {
    const newTipoPlato = new TipoPlato(Nombre, Descripcion, IdUsuario);
    const result = await ControllersTipoPlato.createTipoPlato(newTipoPlato);
    res.status(201).json({ results: result, message: 'Tipo de plato creado exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ results: null, message: 'Hubo un error al crear tipo de plato' });
  }
});

TipoPlatoRoute.put('/updatetipoplato/:id', async (req, res, next) => {
    const {Nombre, Descripcion, IdUsuario} = req.body;
    const tipoPlatoID = parseInt(req.params.id);
  
    try {
      const newTipoPlato = new TipoPlato(Nombre, Descripcion, IdUsuario,tipoPlatoID);
      const result = await ControllersTipoPlato.updateTipoPlato(newTipoPlato);
      res.status(201).json({ results: result, message: 'Tipo de plato actualizado exitosamente' });
    } catch (error) {
      console.log(error)
      res.status(500).json({results:null, message: error  });
    }
});

TipoPlatoRoute.get('/obtenertipoplato', async (req, res) => {
    try {
      const results = await ControllersTipoPlato.obtenerListaTipoPlato();
      res.status(200).json({
        message: "Tipos Platos obtenido con éxito",
        results: results.rows,
      });
    } catch (error) {
      res.status(500).json({ message: error,results:null });
    }
});

TipoPlatoRoute.delete('/deletetipoplato/:id', async (req, res, next) => {
    const tipoPlatoID = parseInt(req.params.id);
    try {
      const result = await ControllersTipoPlato.deleteTipoPlato(tipoPlatoID);
      res.status(200).json({ results: result, message: 'Tipo de plato eliminado exitosamente' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ results: null, message: error });
    }
});
  

export default TipoPlatoRoute;

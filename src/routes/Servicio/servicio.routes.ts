import express from 'express';
import validarToken from '../validarToken';
import Servicio from '../../models/Servicio';
import ServicioController from '../../controllers/servicio/controller.servicio';
import path from 'path';
import fs from 'fs';


const ServiciotoRoute = express.Router();
ServiciotoRoute.use(validarToken);
const ruta = path.resolve();


ServiciotoRoute.post('/createservicio', async (req, res, next) => {
  const { Nombre, Descripcion, FechaInicio, FechaFin, Cupo,Precio, Foto,Lista} = req.body;
  let imageName ='null';
  try {
    if (Foto.mimeType !== null || Foto.base64 !== null) {
      const imageBuffer = Buffer.from(Foto.base64, 'base64');
      imageName = `${Date.now()}${Foto.mimeType}`;
      const imagePath = path.join(ruta, 'public/imagenes-servicios', imageName);
      fs.writeFileSync(imagePath, imageBuffer);
    }
    const newServicio = new Servicio(Nombre, Descripcion, FechaInicio, FechaFin, parseInt(Cupo), parseFloat(Precio),imageName);
    const result = await ServicioController.createServicio(newServicio,Lista);
    res.status(201).json({ results: result, message: 'Servicio creado exitosamente' });
  } catch (error) {
    //console.log(error)
    res.status(500).json({ results: null, message: error });
  }
});

ServiciotoRoute.put('/updateservicio/:id', async (req, res, next) => {
  const { Nombre, Descripcion, FechaInicio, FechaFin, Cupo,Precio, Foto,Lista} = req.body;
  let imageName =Foto;
  const ServicioId = parseInt(req.params.id);
  try {
    if (Foto.mimeType !== undefined || Foto.base64 !== undefined) {
      const imageBuffer = Buffer.from(Foto.base64, 'base64');
      imageName = `${Date.now()}${Foto.mimeType}`;
      const imagePath = path.join(ruta, 'public/imagenes-servicios', imageName);
      fs.writeFileSync(imagePath, imageBuffer);
    }
    const newServicio = new Servicio(Nombre, Descripcion, FechaInicio, FechaFin, parseInt(Cupo), parseFloat(Precio),imageName,ServicioId);
    const result = await ServicioController.updateServicio(newServicio,Lista);
    res.status(201).json({ results: result, message: 'Servicio actualizado exitosamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ results: null, message: error });
  }
});


ServiciotoRoute.get('/obtenerlistaservicios', async (req, res) => {
  try {
    const results = await ServicioController.obtenerListaServicios();
    res.status(200).json({
      message: "Lista de servicios obtenido con éxito",
      results: results.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error, results: null });
  }
});

ServiciotoRoute.delete('/deleteservicio/:id', async (req, res, next) => {
  const servicioID = parseInt(req.params.id);
  try {
    const result = await ServicioController.deleteServicio(servicioID);
    res.status(200).json({ result: result, message: 'Servicio eliminado exitosamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ result: null, message: error });
  }
});

export default ServiciotoRoute;

import express from 'express';
import Plato from '../../models/Plato';
import validarToken from '../validarToken';
import CreatePlatoController from '../../controllers/plato/create-plato';
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const createPlatoRoute = express.Router();
createPlatoRoute.use(validarToken);
const ruta = path.resolve();

/*const storage = multer.diskStorage({
  destination: path.join(path.resolve(), 'public/imagenes-platos'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.trim()}`);
  }
});

const upload = multer({ storage: storage });*/

createPlatoRoute.post('/createplato', async (req, res, next) => {
  const { Nombre, Descripcion, IdUsuario, IdTipoPlato, Estado, Foto } = req.body;
  let imageName ='null';
  try {
    if (Foto.mimeType !== null || Foto.base64 !== null) {
      const imageBuffer = Buffer.from(Foto.base64, 'base64');
      imageName = `${Date.now()}${Foto.mimeType}`;
      const imagePath = path.join(ruta, 'public/imagenes-platos', imageName);
      //console.log('imagePath: ' + imagePath);
      // Guardar la imagen en la carpeta
      fs.writeFileSync(imagePath, imageBuffer);
    }
    const newPlato = new Plato(Nombre, Descripcion, parseInt(IdUsuario), parseInt(IdTipoPlato), parseInt(Estado), imageName);
    const result = await CreatePlatoController.createPlato(newPlato);
    res.status(201).json({ results: result, message: 'Plato creado exitosamente' });
  } catch (error) {
    res.status(500).json({ results: null, message: error });
  }
});

export default createPlatoRoute;

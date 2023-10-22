import express from 'express';
import Plato from '../../models/Plato';
import validarToken from '../validarToken';
import CreatePlatoController from '../../controllers/plato/create-plato';
import multer from 'multer';
import path from 'path';

const createPlatoRoute = express.Router();
createPlatoRoute.use(validarToken);
const ruta = path.resolve();

const storage = multer.diskStorage({
  destination: path.join(path.resolve(), 'public/imagenes-platos'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.trim()}`);
  }
});

const upload = multer({ storage: storage });

createPlatoRoute.post('/createplato',upload.single('fotoplato'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se subió ningún archivo',result:null });
  }
  const { Nombre, Descripcion, IdUsuario, IdTipoPlato, Estado} = req.body;
  const uploadedFile = req.file.filename;
  try {
    const newPlato = new Plato(Nombre, Descripcion,parseInt(IdUsuario) , parseInt(IdTipoPlato),parseInt(Estado), uploadedFile);
    const result = await CreatePlatoController.createPlato(newPlato);
    res.status(201).json({ results: result, message: 'Plato creado exitosamente' });
  } catch (error) {
    res.status(500).json({ results: null, message: error });
  }
});

export default createPlatoRoute;

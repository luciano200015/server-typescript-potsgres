import express from 'express';
import Plato from '../../models/Plato';
import validarToken from '../validarToken';
import UpdatePlatoController from '../../controllers/plato/update-plato';
import multer from 'multer';
import path from 'path';

const updatePlatoRoute = express.Router();
updatePlatoRoute.use(validarToken);

const storage = multer.diskStorage({
  destination: path.join(path.resolve(), 'public/imagenes-platos'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.trim()}`);
  }
});

const upload = multer({ storage: storage });

updatePlatoRoute.put('/updateplato/:id', upload.single('fotoplato'), async (req, res, next) => {
  const {Nombre, Descripcion, IdUsuario, IdTipoPlato, Estado } = req.body;
  const tipoPlatoID = parseInt(req.params.id);
  if (!req.file) {
    return res.status(400).json({ message: 'No se subió ningún archivo', result: null });
  }
  
  const uploadedFile = req.file.filename;

  try {
    const updatedPlato = new Plato(Nombre, Descripcion, parseInt(IdUsuario), parseInt(IdTipoPlato), parseInt(Estado), uploadedFile, tipoPlatoID);
    const result = await UpdatePlatoController.updatePlato(updatedPlato);
    res.status(200).json({ result: result, message: 'Plato actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ result: null, message: error });
  }
});

export default updatePlatoRoute;

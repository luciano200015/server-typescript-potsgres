import express from 'express';
import multer from 'multer';
import path from 'path';
import RegisterControllersUser from '../../controllers/user/register-user';
import Usuario from '../../models/User';
import jwt from 'jsonwebtoken';

//const __dirname = path.resolve();

const registerUserRoute = express.Router();
//const uploadDestination = path.join(__dirname, '../../../public/imagenes-usuarios');
console.log('ruta imprimida por consola : ',path.resolve());

const storage = multer.diskStorage({
  destination: path.join(path.resolve(), 'public/imagenes-usuarios'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.trim()}`)
  }
});

const upload = multer({ storage: storage });

registerUserRoute.post('/createuser', upload.single('fotouser'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }
  const uploadedFile = req.file.filename;
  const { Nombre, Apellido, Correo, Telefono, Estado, EsAdmin, EsAnfitrion } = req.body;
  const esadmin=EsAdmin==='true'?true:false;
  const esanfitrion=EsAnfitrion==='true'?true:false
  console.log(uploadedFile);
  console.log(esadmin,esanfitrion)
  try {
    const newUsuario = new Usuario(Nombre, Apellido,Correo, Telefono ,parseInt(Estado), esadmin, esanfitrion, uploadedFile);
    const result = await RegisterControllersUser.registerUser(newUsuario);
    const token = jwt.sign({ Correo: newUsuario.Correo }, 'LucianoSoruco', { expiresIn: '3h' });
    res.status(201).json({ result: result, message: 'Usuario creado exitosamente',token:token });
  } catch (error) {

    res.status(500).json({ error: error });
  }
});

export default registerUserRoute;

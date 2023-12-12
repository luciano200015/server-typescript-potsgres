import express from 'express';
import fs from 'fs';
import path from 'path';
import RegisterControllersUser from '../../controllers/user/register-user';
import Usuario from '../../models/User';
import jwt from "jsonwebtoken";


const registerUserRoute = express.Router();
const ruta = path.resolve()

registerUserRoute.post('/createuser', async (req, res, next) => {
  const { Nombre, Apellido, Correo, Telefono, Contraseña, EsAdmin, EsAnfitrion, Foto } = req.body;

  console.log(req.body);


  try {
    // Convertir la cadena Base64 en datos binarios
    let imageName ='null'
    if(Foto!==undefined && Foto?.mimeType !== undefined && Foto?.base64 !== undefined ) {
      const imageBuffer = Buffer.from(Foto.base64, 'base64');
      imageName = `${Date.now()}${Foto.mimeType}`; // Personaliza el nombre según tus necesidades
      // Ruta para guardar la imagen
      const imagePath = path.join(ruta, 'public/imagenes-usuarios', imageName);
      console.log('imagePath: ' + imagePath);
      // Guardar la imagen en la carpeta
      fs.writeFileSync(imagePath, imageBuffer);
    }

    const newUsuario = new Usuario(Nombre, Apellido, Correo, Telefono, Contraseña, 1, EsAdmin, EsAnfitrion, imageName);
    console.log(newUsuario);

    const result = await RegisterControllersUser.registerUser(newUsuario);
    const token = jwt.sign({ Correo: Correo }, 'LucianoSoruco', { expiresIn: '14h' });

    res.status(201).json({ result: result, message: 'Usuario creado exitosamente', token: token, auth: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: null, message: error, token: null, auth: false });
  }
});


registerUserRoute.put('/updateuser/:id', async (req, res, next) => {
  const { Nombre, Apellido, Correo, Telefono, Contraseña, EsAdmin, EsAnfitrion, Foto } = req.body;
  const userID = parseInt(req.params.id);


  try {
    // Convertir la cadena Base64 en datos binarios
    let imageName =Foto
    if(Foto!==undefined && Foto?.mimeType !== undefined && Foto?.base64 !== undefined ) {
      const imageBuffer = Buffer.from(Foto.base64, 'base64');
      imageName = `${Date.now()}${Foto.mimeType}`; // Personaliza el nombre según tus necesidades
      // Ruta para guardar la imagen
      const imagePath = path.join(ruta, 'public/imagenes-usuarios', imageName);
      console.log('imagePath: ' + imagePath);
      // Guardar la imagen en la carpeta
      fs.writeFileSync(imagePath, imageBuffer);
    }

    const newUsuario = new Usuario(Nombre, Apellido, Correo, Telefono, Contraseña, 1, EsAdmin, EsAnfitrion, imageName,userID);
    console.log(newUsuario);

    const result = await RegisterControllersUser.registerUser(newUsuario);
    const token = jwt.sign({ Correo: Correo }, 'LucianoSoruco', { expiresIn: '14h' });

    res.status(201).json({ result: result, message: 'Usuario creado exitosamente', token: token, auth: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: null, message: error, token: null, auth: false });
  }
});
export default registerUserRoute;
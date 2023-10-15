import express from 'express';
import multer from 'multer';
import path from 'path';
import RegisterControllersUser from '../../controllers/user/register-user';
import Usuario from '../../models/User';
import otpGenerator from 'otp-generator';
import twilio from 'twilio'; // Reemplaza 'twilio' con la biblioteca Twilio que estés utilizando
import jwt from "jsonwebtoken";


const registerUserRoute = express.Router();
//const verifPhone='7F4KXBKFU1757SCH6LMFDSYV';
const storage = multer.diskStorage({
  destination: path.join(path.resolve(), 'public/imagenes-usuarios'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.trim()}`);
  }
});

const upload = multer({ storage: storage });

// Configura Twilio
const twilioAccountSid = 'ACe8ff564264e544d88b01c3efefe2906b'; // Reemplaza con tu SID de cuenta de Twilio
const twilioAuthToken = '27a9f814b98ac11c09f5ef88dd934005'; // Reemplaza con tu Token de autenticación de Twilio
const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

registerUserRoute.post('/createuser', upload.single('fotouser'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }

  const uploadedFile = req.file.filename;
  const { Nombre, Apellido, Correo, Telefono, Contrasena, Estado, EsAdmin, EsAnfitrion } = req.body;
  const esadmin = EsAdmin === 'true' ? true : false;
  const esanfitrion = EsAnfitrion === 'true' ? true : false;

  try {
    

    const newUsuario = new Usuario(Nombre, Apellido, Correo, Telefono,Contrasena, parseInt(Estado), esadmin, esanfitrion, uploadedFile);
    const result = await RegisterControllersUser.registerUser(newUsuario);
    const token = jwt.sign({Correo: Correo }, 'LucianoSoruco', { expiresIn: '14h' });
    // Genera un código OTP
    const otpCode = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    //Envía el código OTP al número de teléfono del usuario utilizando Twilio
    /*const messageCode = `${otpCode}`;
    twilioClient.messages
    .create({
        body: messageCode,
        from:'whatsapp:+14155238886',
        to: `whatsapp:${Telefono}`
    })
    .then(message => console.log(message.sid));*/

    res.status(201).json({ result: result, message: 'Usuario creado exitosamente',token:token,auth:true });
  } catch (error) {
    res.status(500).json({result:null, message: error ,token:null,auth:false });
  }
});

export default registerUserRoute;

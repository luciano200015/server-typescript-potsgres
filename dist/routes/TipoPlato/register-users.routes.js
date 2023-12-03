"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const register_user_1 = __importDefault(require("../../controllers/user/register-user"));
const User_1 = __importDefault(require("../../models/User"));
//import otpGenerator from 'otp-generator';
//import twilio from 'twilio'; // Reemplaza 'twilio' con la biblioteca Twilio que estés utilizando
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUserRoute = express_1.default.Router();
//const verifPhone='7F4KXBKFU1757SCH6LMFDSYV';
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(path_1.default.resolve(), 'public/imagenes-usuarios'),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.trim()}`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
// Configura Twilio
/*const twilioAccountSid = 'ACe8ff564264e544d88b01c3efefe2906b'; // Reemplaza con tu SID de cuenta de Twilio
const twilioAuthToken = '27a9f814b98ac11c09f5ef88dd934005'; // Reemplaza con tu Token de autenticación de Twilio
const twilioClient = twilio(twilioAccountSid, twilioAuthToken);*/
registerUserRoute.post('/createuser', upload.single('fotouser'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ error: 'No se subió ningún archivo' });
    }
    const uploadedFile = req.file.filename;
    const { Nombre, Apellido, Correo, Telefono, Contrasena, Estado, EsAdmin, EsAnfitrion } = req.body;
    const esadmin = EsAdmin === 'true' ? true : false;
    const esanfitrion = EsAnfitrion === 'true' ? true : false;
    try {
        const newUsuario = new User_1.default(Nombre, Apellido, Correo, Telefono, Contrasena, parseInt(Estado), esadmin, esanfitrion, uploadedFile);
        const result = yield register_user_1.default.registerUser(newUsuario);
        const token = jsonwebtoken_1.default.sign({ Correo: Correo }, 'LucianoSoruco', { expiresIn: '14h' });
        // Genera un código OTP
        //const otpCode = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        //Envía el código OTP al número de teléfono del usuario utilizando Twilio
        /*const messageCode = `${otpCode}`;
        twilioClient.messages
        .create({
            body: messageCode,
            from:'whatsapp:+14155238886',
            to: `whatsapp:${Telefono}`
        })
        .then(message => console.log(message.sid));*/
        res.status(201).json({ result: result, message: 'Usuario creado exitosamente', token: token, auth: true });
    }
    catch (error) {
        res.status(500).json({ result: null, message: error, token: null, auth: false });
    }
}));
exports.default = registerUserRoute;

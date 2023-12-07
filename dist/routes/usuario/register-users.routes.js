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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const register_user_1 = __importDefault(require("../../controllers/user/register-user"));
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUserRoute = express_1.default.Router();
const ruta = path_1.default.resolve();
registerUserRoute.post('/createuser', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Apellido, Correo, Telefono, Contraseña, EsAdmin, EsAnfitrion, Foto } = req.body;
    console.log(req.body);
    try {
        // Convertir la cadena Base64 en datos binarios
        let imageName = 'null';
        if (Foto !== undefined && (Foto === null || Foto === void 0 ? void 0 : Foto.mimeType) !== undefined && (Foto === null || Foto === void 0 ? void 0 : Foto.base64) !== undefined) {
            const imageBuffer = Buffer.from(Foto.base64, 'base64');
            imageName = `${Date.now()}${Foto.mimeType}`; // Personaliza el nombre según tus necesidades
            // Ruta para guardar la imagen
            const imagePath = path_1.default.join(ruta, 'public/imagenes-usuarios', imageName);
            console.log('imagePath: ' + imagePath);
            // Guardar la imagen en la carpeta
            fs_1.default.writeFileSync(imagePath, imageBuffer);
        }
        const newUsuario = new User_1.default(Nombre, Apellido, Correo, Telefono, Contraseña, 1, EsAdmin, EsAnfitrion, imageName);
        console.log(newUsuario);
        const result = yield register_user_1.default.registerUser(newUsuario);
        const token = jsonwebtoken_1.default.sign({ Correo: Correo }, 'LucianoSoruco', { expiresIn: '14h' });
        res.status(201).json({ result: result, message: 'Usuario creado exitosamente', token: token, auth: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ result: null, message: error, token: null, auth: false });
    }
}));
exports.default = registerUserRoute;

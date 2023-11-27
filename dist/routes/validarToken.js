"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validarToken(req, res, next) {
    // Obtener el token del encabezado de la solicitud
    const token = req.headers.authorization || req.body.authorization;
    if (!token) {
        return res.status(401).json({ auth: false, message: 'Token no proporcionado' });
    }
    // Verificar y decodificar el token
    jsonwebtoken_1.default.verify(token, 'LucianoSoruco', (err, decoded) => {
        if (err) {
            return res.status(403).json({ auth: false, message: 'Token inválido o expirado' });
        }
        next();
    });
}
exports.default = validarToken;

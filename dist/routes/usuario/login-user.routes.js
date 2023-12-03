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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_user_1 = __importDefault(require("../../controllers/user/login-user"));
const loginUsuarioRoute = express_1.default.Router();
loginUsuarioRoute.post('/loginuser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Correo, Contrasena } = req.body;
        const results = yield login_user_1.default.loginUser(Correo, Contrasena);
        console.log(results);
        if (results.rows.length === 0) {
            res.status(200).json({
                message: "Contraseña o correo incorecto",
                results: null,
                token: null,
                auth: false
            });
            return;
        }
        if (results.rows[0].estado === 0) {
            res.status(200).json({
                message: "Usuario Bloqueado",
                results: null,
                token: null,
                auth: false
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ Correo: Correo }, 'LucianoSoruco', { expiresIn: '14h' });
        res.status(200).json({
            message: "logueado con exito",
            token: token,
            auth: true,
            results: results.rows[0],
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
            results: null,
            token: null,
            auth: false
        });
    }
}));
exports.default = loginUsuarioRoute;

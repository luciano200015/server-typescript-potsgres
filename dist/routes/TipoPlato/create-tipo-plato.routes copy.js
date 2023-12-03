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
const TipoPlato_1 = __importDefault(require("../../models/TipoPlato"));
const create_tipo_plato_1 = __importDefault(require("../../controllers/tipo-plato/create-tipo-plato"));
const validarToken_1 = __importDefault(require("../validarToken"));
const crateTipoPlatoRoute = express_1.default.Router();
crateTipoPlatoRoute.use(validarToken_1.default);
crateTipoPlatoRoute.post('/createtipoplato', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Descripcion, IdUsuario } = req.body;
    try {
        const newTipoPlato = new TipoPlato_1.default(Nombre, Descripcion, IdUsuario);
        const result = yield create_tipo_plato_1.default.createTipoPlato(newTipoPlato);
        res.status(201).json({ result: result, message: 'Tipo de plato creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ result: null, message: error });
    }
}));
exports.default = crateTipoPlatoRoute;

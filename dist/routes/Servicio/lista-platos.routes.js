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
const validarToken_1 = __importDefault(require("../../validarToken"));
const lista_platos_1 = __importDefault(require("../../controllers/plato/lista-platos"));
const obtenePlatoRoute = express_1.default.Router();
obtenePlatoRoute.use(validarToken_1.default);
obtenePlatoRoute.get('/obtenerplatos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield lista_platos_1.default.obtenerListaPlatos();
        res.status(200).json({
            message: "Lista Platos obtenido con éxito",
            results: results.rows,
        });
    }
    catch (error) {
        res.status(500).json({ message: error, results: null });
    }
}));
exports.default = obtenePlatoRoute;

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
const validarToken_1 = __importDefault(require("../validarToken"));
const controller_tipo_plato_1 = __importDefault(require("../../controllers/tipo-plato/controller.tipo-plato"));
const TipoPlatoRoute = express_1.default.Router();
TipoPlatoRoute.use(validarToken_1.default);
TipoPlatoRoute.post('/createtipoplato', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Descripcion, IdUsuario } = req.body;
    try {
        const newTipoPlato = new TipoPlato_1.default(Nombre, Descripcion, IdUsuario);
        const result = yield controller_tipo_plato_1.default.createTipoPlato(newTipoPlato);
        res.status(201).json({ results: result, message: 'Tipo de plato creado exitosamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ results: null, message: 'Hubo un error al crear tipo de plato' });
    }
}));
TipoPlatoRoute.put('/updatetipoplato/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Descripcion, IdUsuario } = req.body;
    const tipoPlatoID = parseInt(req.params.id);
    try {
        const newTipoPlato = new TipoPlato_1.default(Nombre, Descripcion, IdUsuario, tipoPlatoID);
        const result = yield controller_tipo_plato_1.default.updateTipoPlato(newTipoPlato);
        res.status(201).json({ results: result, message: 'Tipo de plato actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ results: null, message: error });
    }
}));
TipoPlatoRoute.get('/obtenertipoplato', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield controller_tipo_plato_1.default.obtenerListaTipoPlato();
        res.status(200).json({
            message: "Tipos Platos obtenido con éxito",
            results: results.rows,
        });
    }
    catch (error) {
        res.status(500).json({ message: error, results: null });
    }
}));
TipoPlatoRoute.delete('/deletetipoplato/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tipoPlatoID = parseInt(req.params.id);
    try {
        const result = yield controller_tipo_plato_1.default.deleteTipoPlato(tipoPlatoID);
        res.status(200).json({ results: result, message: 'Tipo de plato eliminado exitosamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ results: null, message: error });
    }
}));
exports.default = TipoPlatoRoute;

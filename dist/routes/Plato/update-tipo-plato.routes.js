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
const update_tipo_plato_1 = __importDefault(require("../../controllers/tipo-plato/update-tipo-plato"));
const validarToken_1 = __importDefault(require("../validarToken"));
const updateTipoPlatoRoute = express_1.default.Router();
updateTipoPlatoRoute.use(validarToken_1.default);
updateTipoPlatoRoute.put('/updatetipoplato/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Descripcion, IdUsuario } = req.body;
    const tipoPlatoID = parseInt(req.params.id);
    try {
        const newTipoPlato = new TipoPlato_1.default(Nombre, Descripcion, IdUsuario, tipoPlatoID);
        const result = yield update_tipo_plato_1.default.updateTipoPlato(newTipoPlato);
        res.status(201).json({ result: result, message: 'Tipo de plato actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ result: null, message: error });
    }
}));
exports.default = updateTipoPlatoRoute;

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
const delete_tipo_plato_1 = __importDefault(require("../../controllers/tipo-plato/delete-tipo-plato"));
const validarToken_1 = __importDefault(require("../validarToken"));
const deleteTipoPlatoRoute = express_1.default.Router();
deleteTipoPlatoRoute.use(validarToken_1.default);
deleteTipoPlatoRoute.delete('/deletetipoplato/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tipoPlatoID = parseInt(req.params.id);
    try {
        const result = yield delete_tipo_plato_1.default.deleteTipoPlato(tipoPlatoID);
        res.status(200).json({ results: result, message: 'Tipo de plato eliminado exitosamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ results: null, message: error });
    }
}));
exports.default = deleteTipoPlatoRoute;

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
const delete_plato_1 = __importDefault(require("../../controllers/plato/delete-plato"));
const validarToken_1 = __importDefault(require("../validarToken"));
const deletePlatoRoute = express_1.default.Router();
deletePlatoRoute.use(validarToken_1.default);
deletePlatoRoute.delete('/deleteplato/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const platoID = parseInt(req.params.id);
    try {
        const result = yield delete_plato_1.default.deletePlato(platoID);
        res.status(200).json({ result: result, message: 'Plato eliminado exitosamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ result: null, message: error });
    }
}));
exports.default = deletePlatoRoute;

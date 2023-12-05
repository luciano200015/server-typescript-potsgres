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
const capadato_tipo_plato_1 = __importDefault(require("../../capa-datos/tipo-plato/capadato.tipo-plato"));
class ControllersTipoPlato {
    static createTipoPlato(tipoplato) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_tipo_plato_1.default.createTipoPlato(tipoplato);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateTipoPlato(tipoplato) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_tipo_plato_1.default.updateTipoPlato(tipoplato);
                console.log(response);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static obtenerListaTipoPlato() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_tipo_plato_1.default.obtenerListaTipoPlato();
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteTipoPlato(tipoPlatoID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_tipo_plato_1.default.deleteTipoPlato(tipoPlatoID);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ControllersTipoPlato;

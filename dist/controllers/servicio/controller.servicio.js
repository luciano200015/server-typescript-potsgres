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
const capadato_servicio_1 = __importDefault(require("../../capa-datos/servicio/capadato.servicio"));
class ServicioController {
    //crear nuevo servicio
    static createServicio(servicio, lista) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_servicio_1.default.createServicio(servicio, lista);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //actualizar servicio
    static updateServicio(servicio, lista) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_servicio_1.default.updateServicio(servicio, lista);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //obtener lista de servicios
    static obtenerListaServicios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_servicio_1.default.obtenerListaServicios();
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //eliminar servicio
    static deleteServicio(servicioID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_servicio_1.default.deleteServicio(servicioID);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static obtenerListaServiciosPorFechaSinToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_servicio_1.default.obtenerListaServiciosPorFechaSinToken();
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ServicioController;

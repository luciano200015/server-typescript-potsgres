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
const capadato_reserva_1 = __importDefault(require("../../capa-datos/reserva/capadato.reserva"));
class ReservaController {
    static createReserva(reserva) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_reserva_1.default.createReserva(reserva);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateReserva(reserva) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_reserva_1.default.updateReserva(reserva);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static cancelarReserva(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_reserva_1.default.cancelarReserva(id);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static obtenerListaReservas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_reserva_1.default.obtenerListaReservas();
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static obtenerListaReservasUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_reserva_1.default.obtenerListaReservasUser(idUser);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteReserva(reservaID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_reserva_1.default.deleteReserva(reservaID);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ReservaController;

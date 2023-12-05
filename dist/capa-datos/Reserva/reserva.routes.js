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
const validarToken_1 = __importDefault(require("../validarToken"));
const controller_tipo_plato_1 = __importDefault(require("../../controllers/tipo-plato/controller.tipo-plato"));
const controller_reserva_1 = __importDefault(require("../../controllers/reserva/controller.reserva"));
const Reserva_1 = __importDefault(require("../../models/Reserva"));
const ReservaRoute = express_1.default.Router();
ReservaRoute.use(validarToken_1.default);
ReservaRoute.post('/createreserva', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { FechaReserva, Cupo, Observacion, Estado, IdUsuario, IdServicio } = req.body;
    try {
        const newReserva = new Reserva_1.default(FechaReserva, parseInt(Cupo), Observacion, parseInt(Estado), parseInt(IdUsuario), parseInt(IdServicio));
        const result = yield controller_reserva_1.default.createReserva(newReserva);
        res.status(201).json({ results: result, message: 'reserva creada exitosamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ results: null, message: error });
    }
}));
ReservaRoute.put('/updatereserva/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { FechaReserva, Cupo, Observacion, Estado, IdUsuario, IdServicio } = req.body;
    const reservaID = parseInt(req.params.id);
    try {
        const newReserva = new Reserva_1.default(FechaReserva, parseInt(Cupo), Observacion, parseInt(Estado), parseInt(IdUsuario), parseInt(IdServicio), '', 0, reservaID);
        //console.log(newReserva)
        const result = yield controller_reserva_1.default.updateReserva(newReserva);
        res.status(201).json({ results: result, message: 'Reserva actualizado exitosamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ results: null, message: error });
    }
}));
ReservaRoute.get('/obtenerlistareservas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield controller_reserva_1.default.obtenerListaReservas();
        res.status(200).json({
            message: "Lista de reserva obtenido con éxito",
            results: results.rows,
        });
    }
    catch (error) {
        res.status(500).json({ message: error, results: null });
    }
}));
ReservaRoute.get('/obtenerlistareservasuser/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = parseInt(req.params.id);
    try {
        const results = yield controller_reserva_1.default.obtenerListaReservasUser(userID);
        res.status(200).json({
            message: "Lista de reserva obtenido con éxito",
            results: results.rows,
        });
    }
    catch (error) {
        res.status(500).json({ message: error, results: null });
    }
}));
ReservaRoute.delete('/deletereserva/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reservaID = parseInt(req.params.id);
    try {
        const result = yield controller_tipo_plato_1.default.deleteTipoPlato(reservaID);
        res.status(200).json({ results: result, message: 'Reserva eliminada exitosamente' });
    }
    catch (error) {
        //console.log(error);
        res.status(500).json({ results: null, message: error });
    }
}));
exports.default = ReservaRoute;

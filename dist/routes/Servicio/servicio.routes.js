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
const Servicio_1 = __importDefault(require("../../models/Servicio"));
const controller_servicio_1 = __importDefault(require("../../controllers/servicio/controller.servicio"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ServiciotoRoute = express_1.default.Router();
ServiciotoRoute.use(validarToken_1.default);
const ruta = path_1.default.resolve();
ServiciotoRoute.post('/createservicio', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Descripcion, FechaInicio, FechaFin, Cupo, Precio, Foto, Lista } = req.body;
    let imageName = 'null';
    try {
        if (Foto.mimeType !== null || Foto.base64 !== null) {
            const imageBuffer = Buffer.from(Foto.base64, 'base64');
            imageName = `${Date.now()}${Foto.mimeType}`;
            const imagePath = path_1.default.join(ruta, 'public/imagenes-servicios', imageName);
            fs_1.default.writeFileSync(imagePath, imageBuffer);
        }
        const newServicio = new Servicio_1.default(Nombre, Descripcion, FechaInicio, FechaFin, parseInt(Cupo), parseFloat(Precio), imageName);
        const result = yield controller_servicio_1.default.createServicio(newServicio, Lista);
        res.status(201).json({ results: result, message: 'Servicio creado exitosamente' });
    }
    catch (error) {
        //console.log(error)
        res.status(500).json({ results: null, message: error });
    }
}));
ServiciotoRoute.put('/updateservicio/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Descripcion, FechaInicio, FechaFin, Cupo, Precio, Foto, Lista } = req.body;
    let imageName = Foto;
    const ServicioId = parseInt(req.params.id);
    try {
        if (Foto.mimeType !== undefined || Foto.base64 !== undefined) {
            const imageBuffer = Buffer.from(Foto.base64, 'base64');
            imageName = `${Date.now()}${Foto.mimeType}`;
            const imagePath = path_1.default.join(ruta, 'public/imagenes-servicios', imageName);
            fs_1.default.writeFileSync(imagePath, imageBuffer);
        }
        const newServicio = new Servicio_1.default(Nombre, Descripcion, FechaInicio, FechaFin, parseInt(Cupo), parseFloat(Precio), imageName, ServicioId);
        const result = yield controller_servicio_1.default.updateServicio(newServicio, Lista);
        res.status(201).json({ results: result, message: 'Servicio actualizado exitosamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ results: null, message: error });
    }
}));
ServiciotoRoute.get('/obtenerlistaservicios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield controller_servicio_1.default.obtenerListaServicios();
        res.status(200).json({
            message: "Lista de servicios obtenido con éxito",
            results: results.rows,
        });
    }
    catch (error) {
        res.status(500).json({ message: error, results: null });
    }
}));
ServiciotoRoute.delete('/deleteservicio/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const servicioID = parseInt(req.params.id);
    try {
        const result = yield controller_servicio_1.default.deleteServicio(servicioID);
        res.status(200).json({ result: result, message: 'Servicio eliminado exitosamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ result: null, message: error });
    }
}));
exports.default = ServiciotoRoute;

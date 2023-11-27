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
const Plato_1 = __importDefault(require("../../models/Plato"));
const validarToken_1 = __importDefault(require("../validarToken"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const controller_plato_1 = __importDefault(require("../../controllers/plato/controller.plato"));
const PlatoRoute = express_1.default.Router();
PlatoRoute.use(validarToken_1.default);
const ruta = path_1.default.resolve();
PlatoRoute.post('/createplato', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Descripcion, IdUsuario, IdTipoPlato, Estado, Foto } = req.body;
    let imageName = 'null';
    try {
        if (Foto.mimeType !== null || Foto.base64 !== null) {
            const imageBuffer = Buffer.from(Foto.base64, 'base64');
            imageName = `${Date.now()}${Foto.mimeType}`;
            const imagePath = path_1.default.join(ruta, 'public/imagenes-platos', imageName);
            fs_1.default.writeFileSync(imagePath, imageBuffer);
        }
        const newPlato = new Plato_1.default(Nombre, Descripcion, parseInt(IdUsuario), parseInt(IdTipoPlato), parseInt(Estado), imageName);
        const result = yield controller_plato_1.default.createPlato(newPlato);
        res.status(201).json({ results: result, message: 'Plato creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ results: null, message: error });
    }
}));
PlatoRoute.put('/updateplato/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Descripcion, IdUsuario, Foto, IdTipoPlato, Estado } = req.body;
    const tipoPlatoID = parseInt(req.params.id);
    let imageName = Foto;
    try {
        if (Foto.mimeType !== undefined || Foto.base64 !== undefined) {
            const imageBuffer = Buffer.from(Foto.base64, 'base64');
            imageName = `${Date.now()}${Foto.mimeType}`;
            const imagePath = path_1.default.join(ruta, 'public/imagenes-platos', imageName);
            //console.log('imagePath: ' + imagePath);
            // Guardar la imagen en la carpeta
            fs_1.default.writeFileSync(imagePath, imageBuffer);
        }
        const updatedPlato = new Plato_1.default(Nombre, Descripcion, parseInt(IdUsuario), parseInt(IdTipoPlato), parseInt(Estado), imageName, tipoPlatoID);
        const result = yield controller_plato_1.default.updatePlato(updatedPlato);
        res.status(200).json({ result: result, message: 'Plato actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ result: null, message: error });
    }
}));
PlatoRoute.get('/obtenerplatos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield controller_plato_1.default.obtenerListaPlatos();
        res.status(200).json({
            message: "Lista Platos obtenido con éxito",
            results: results.rows,
        });
    }
    catch (error) {
        res.status(500).json({ message: error, results: null });
    }
}));
PlatoRoute.delete('/deleteplato/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const platoID = parseInt(req.params.id);
    try {
        const result = yield controller_plato_1.default.deletePlato(platoID);
        res.status(200).json({ result: result, message: 'Plato eliminado exitosamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ result: null, message: error });
    }
}));
exports.default = PlatoRoute;

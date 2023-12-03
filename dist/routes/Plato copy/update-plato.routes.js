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
const update_plato_1 = __importDefault(require("../../controllers/plato/update-plato"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const createPlatoRoute = express_1.default.Router();
createPlatoRoute.use(validarToken_1.default);
const ruta = path_1.default.resolve();
const updatePlatoRoute = express_1.default.Router();
updatePlatoRoute.use(validarToken_1.default);
updatePlatoRoute.put('/updateplato/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield update_plato_1.default.updatePlato(updatedPlato);
        res.status(200).json({ result: result, message: 'Plato actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ result: null, message: error });
    }
}));
exports.default = updatePlatoRoute;

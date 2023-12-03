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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const updatePlatoRoute = express_1.default.Router();
updatePlatoRoute.use(validarToken_1.default);
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(path_1.default.resolve(), 'public/imagenes-platos'),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.trim()}`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
updatePlatoRoute.put('/updateplato/:id', upload.single('fotoplato'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Descripcion, IdUsuario, IdTipoPlato, Estado } = req.body;
    const tipoPlatoID = parseInt(req.params.id);
    if (!req.file) {
        return res.status(400).json({ message: 'No se subió ningún archivo', result: null });
    }
    const uploadedFile = req.file.filename;
    try {
        const updatedPlato = new Plato_1.default(Nombre, Descripcion, parseInt(IdUsuario), parseInt(IdTipoPlato), parseInt(Estado), uploadedFile, tipoPlatoID);
        const result = yield update_plato_1.default.updatePlato(updatedPlato);
        res.status(200).json({ result: result, message: 'Plato actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ result: null, message: error });
    }
}));
exports.default = updatePlatoRoute;

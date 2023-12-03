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
const create_plato_1 = __importDefault(require("../../controllers/plato/create-plato"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const createPlatoRoute = express_1.default.Router();
createPlatoRoute.use(validarToken_1.default);
const ruta = path_1.default.resolve();
/*const storage = multer.diskStorage({
  destination: path.join(path.resolve(), 'public/imagenes-platos'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.trim()}`);
  }
});

const upload = multer({ storage: storage });*/
createPlatoRoute.post('/createplato', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Descripcion, IdUsuario, IdTipoPlato, Estado, Foto } = req.body;
    let imageName = 'null';
    try {
        if (Foto.mimeType !== null || Foto.base64 !== null) {
            const imageBuffer = Buffer.from(Foto.base64, 'base64');
            imageName = `${Date.now()}${Foto.mimeType}`;
            const imagePath = path_1.default.join(ruta, 'public/imagenes-platos', imageName);
            //console.log('imagePath: ' + imagePath);
            // Guardar la imagen en la carpeta
            fs_1.default.writeFileSync(imagePath, imageBuffer);
        }
        const newPlato = new Plato_1.default(Nombre, Descripcion, parseInt(IdUsuario), parseInt(IdTipoPlato), parseInt(Estado), imageName);
        const result = yield create_plato_1.default.createPlato(newPlato);
        res.status(201).json({ results: result, message: 'Plato creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ results: null, message: error });
    }
}));
exports.default = createPlatoRoute;

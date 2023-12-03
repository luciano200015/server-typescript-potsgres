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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const controller_producto_1 = __importDefault(require("../../controllers/producto/controller.producto"));
const Producto_1 = __importDefault(require("../../models/Producto"));
const ProductoRoute = express_1.default.Router();
ProductoRoute.use(validarToken_1.default);
const ruta = path_1.default.resolve();
ProductoRoute.post('/createproducto', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Descripcion, Foto, Precio, Stock, Estado } = req.body;
    let imageName = 'null';
    try {
        if (Foto.mimeType !== null || Foto.base64 !== null) {
            const imageBuffer = Buffer.from(Foto.base64, 'base64');
            imageName = `${Date.now()}${Foto.mimeType}`;
            const imagePath = path_1.default.join(ruta, 'public/imagenes-productos', imageName);
            fs_1.default.writeFileSync(imagePath, imageBuffer);
        }
        const newProducto = new Producto_1.default(Nombre, Descripcion, imageName, parseFloat(Precio), parseInt(Stock), parseInt(Estado));
        const result = yield controller_producto_1.default.createProducto(newProducto);
        res.status(201).json({ results: result, message: 'Producto creado exitosamente' });
    }
    catch (error) {
        //console.log(error)
        res.status(500).json({ results: null, message: error });
    }
}));
ProductoRoute.put('/updateproducto/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Descripcion, Foto, Precio, Stock, Estado } = req.body;
    let imageName = Foto;
    const ProductoId = parseInt(req.params.id);
    try {
        if (Foto.mimeType !== undefined || Foto.base64 !== undefined) {
            const imageBuffer = Buffer.from(Foto.base64, 'base64');
            imageName = `${Date.now()}${Foto.mimeType}`;
            const imagePath = path_1.default.join(ruta, 'public/imagenes-productos', imageName);
            fs_1.default.writeFileSync(imagePath, imageBuffer);
        }
        const newProducto = new Producto_1.default(Nombre, Descripcion, imageName, parseFloat(Precio), parseInt(Stock), parseInt(Estado), ProductoId);
        const result = yield controller_producto_1.default.updateProducto(newProducto);
        res.status(201).json({ results: result, message: 'Producto actualizado exitosamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ results: null, message: error });
    }
}));
ProductoRoute.get('/obtenerproductos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield controller_producto_1.default.obtenerListaProductos();
        res.status(200).json({
            message: "Lista de productos obtenido con éxito",
            results: results.rows,
        });
    }
    catch (error) {
        res.status(500).json({ message: error, results: null });
    }
}));
ProductoRoute.delete('/deleteproducto/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productoID = parseInt(req.params.id);
    try {
        const result = yield controller_producto_1.default.deleteProducto(productoID);
        res.status(200).json({ result: result, message: 'Producto eliminado exitosamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ result: null, message: error });
    }
}));
exports.default = ProductoRoute;

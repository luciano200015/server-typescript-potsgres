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
const capadato_producto_1 = __importDefault(require("../../capa-datos/producto/capadato.producto"));
class ProductoController {
    //crear nuevo Producto
    static createProducto(Producto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_producto_1.default.createProducto(Producto);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //actualizar Producto
    static updateProducto(Producto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_producto_1.default.updateProducto(Producto);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //obtener lista de Producto
    static obtenerListaProductos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_producto_1.default.obtenerListaProductos();
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //eliminar Producto
    static deleteProducto(productoID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield capadato_producto_1.default.deleteProducto(productoID);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ProductoController;

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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../db/database");
class ProductoCapaDato {
    //crear nuevo Producto
    static createProducto(Producto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query('INSERT INTO Producto (Nombre, Descripcion, Foto, Precio, Stock, Estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [Producto.Nombre, Producto.Descripcion, Producto.Foto, Producto.Precio, Producto.Stock, Producto.Estado]);
                const result = response.rows[0];
                return result;
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
                const response = yield database_1.pool.query(`UPDATE Producto 
            SET Nombre = $1, 
            Descripcion = $2, 
            Foto = $3, 
            Precio = $4, 
            Stock = $5, 
            Estado = $6
            WHERE ID = $7 RETURNING *`, [Producto.Nombre, Producto.Descripcion, Producto.Foto, Producto.Precio, Producto.Stock, Producto.Estado, Producto.ID]);
                return response.rows[0];
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
                const response = yield database_1.pool.query(`SELECT * FROM Producto`);
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
                const response = yield database_1.pool.query('DELETE FROM Producto WHERE ID = $1 RETURNING *', [productoID]);
                return response.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ProductoCapaDato;

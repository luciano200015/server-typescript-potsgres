"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Producto {
    constructor(Nombre, Descripcion, Foto, Precio, Stock, Estado, id = 0) {
        this.ID = id;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.Foto = Foto;
        this.Precio = Precio;
        this.Stock = Stock;
        this.Estado = Estado;
    }
}
exports.default = Producto;

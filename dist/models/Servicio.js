"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Servicio {
    constructor(Nombre, Descripcion, FechaInicio, FechaFin, Cupo, Precio, Foto, id = 0) {
        this.ID = id;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.FechaInicio = FechaInicio;
        this.FechaFin = FechaFin;
        this.Cupo = Cupo;
        this.Precio = Precio;
        this.Foto = Foto;
    }
}
exports.default = Servicio;

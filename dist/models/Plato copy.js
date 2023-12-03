"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Plato {
    constructor(Nombre, Descripcion, IdUsuario, IdTipoPlato, Estado, Foto, id = 0) {
        this.ID = id;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.IdUsuario = IdUsuario;
        this.Estado = Estado;
        this.Foto = Foto;
        this.IdTipoPlato = IdTipoPlato;
    }
}
exports.default = Plato;

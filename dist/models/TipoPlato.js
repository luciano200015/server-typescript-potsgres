"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TipoPlato {
    constructor(Nombre, Descripcion, IdUsuario, id = 0) {
        this.ID = id;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.IdUsuario = IdUsuario;
    }
}
exports.default = TipoPlato;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(Nombre, Apellido, Correo, Telefono, Contraseña, Estado, EsAdmin, EsAnfitrion, Foto = '', id = 0) {
        this.ID = id;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Correo = Correo;
        this.Telefono = Telefono;
        this.Contraseña = Contraseña;
        this.Estado = Estado;
        this.EsAdmin = EsAdmin;
        this.EsAnfitrion = EsAnfitrion;
        this.Foto = Foto;
    }
}
exports.default = Usuario;

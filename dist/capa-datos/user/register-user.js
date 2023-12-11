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
class RegisterCapaDatosUser {
    static registerUser(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query('INSERT INTO Usuario (Nombre, Apellido, Correo, Telefono, Contraseña, Estado, EsAdmin, EsAnfitrion, Foto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [usuario.Nombre, usuario.Apellido, usuario.Correo, usuario.Telefono, usuario.Contraseña, usuario.Estado, usuario.EsAdmin, usuario.EsAnfitrion, usuario.Foto]);
                return response.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateUser(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query(`UPDATE Usuario 
                SET Nombre = $1, 
                Apellido = $2, 
                Correo = $3, 
                Telefono = $4, 
                Contraseña = $5, 
                Estado = $6, 
                EsAdmin = $7, 
                EsAnfitrion = $8, 
                Foto = $9
                WHERE ID = $10`, [usuario.Nombre, usuario.Apellido, usuario.Correo, usuario.Telefono, usuario.Contraseña, usuario.Estado, usuario.EsAdmin, usuario.EsAnfitrion, usuario.Foto, usuario.ID]);
                return response.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = RegisterCapaDatosUser;

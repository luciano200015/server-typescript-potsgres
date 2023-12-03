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
class ControllersTipoPlato {
    static createTipoPlato(tipoplato) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query('INSERT INTO TipoPlato (Nombre, Descripcion, IdUsuario) VALUES ($1, $2, $3) RETURNING *', [tipoplato.Nombre, tipoplato.Descripcion, tipoplato.IdUsuario]);
                return response.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateTipoPlato(tipoplato) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query(`UPDATE TipoPlato
                SET Nombre = $1, Descripcion = $2, IdUsuario = $3
                WHERE ID = $4
                RETURNING TipoPlato.*, 
                          (SELECT Nombre FROM Usuario WHERE ID = $3) AS NombreUsuario,
                          (SELECT Apellido FROM Usuario WHERE ID = $3) AS ApellidoUsuario`, [tipoplato.Nombre, tipoplato.Descripcion, tipoplato.IdUsuario, tipoplato.ID]);
                return response.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    static obtenerListaTipoPlato() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query(`SELECT tp.*,
            u.Nombre AS NombreUsuario,
            u.Apellido AS ApellidoUsuario
            FROM TipoPlato tp
            JOIN Usuario u ON tp.IdUsuario = u.ID
            ORDER BY tp.ID ASC`);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteTipoPlato(tipoPlatoID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query('DELETE FROM TipoPlato WHERE ID = $1 RETURNING *', [tipoPlatoID]);
                return response.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ControllersTipoPlato;

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
class PlatoController {
    static createPlato(plato) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query('INSERT INTO Plato (Nombre, Descripcion, IdUsuario, IdTipoPlato, Estado, Foto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [plato.Nombre, plato.Descripcion, plato.IdUsuario, plato.IdTipoPlato, plato.Estado, plato.Foto]);
                return response.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updatePlato(plato) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query(`UPDATE Plato 
                SET Nombre = $1, 
                Descripcion = $2, 
                IdUsuario = $3, 
                IdTipoPlato = $4, 
                Estado = $5, 
                Foto = $6 
                WHERE ID = $7 RETURNING *`, [plato.Nombre, plato.Descripcion, plato.IdUsuario, plato.IdTipoPlato, plato.Estado, plato.Foto, plato.ID]);
                return response.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    static obtenerListaPlatos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query(`
          SELECT
          p.*,
          tp.Nombre AS TipoPlatoNombre,
          u.Nombre AS NombreUsuario
        FROM Plato p
        JOIN TipoPlato tp ON p.IdTipoPlato = tp.ID
        JOIN Usuario u ON p.IdUsuario = u.ID;
          `);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deletePlato(platoID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query('DELETE FROM Plato WHERE ID = $1 RETURNING *', [platoID]);
                return response.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = PlatoController;

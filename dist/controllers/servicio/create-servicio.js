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
class ServicioController {
    //crear nuevo servicio
    static createServicio(servicio, lista) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query('INSERT INTO Servicio (Nombre, Descripcion, FechaInicio, FechaFin, Cupo, Precio, Foto) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [servicio.Nombre, servicio.Descripcion, servicio.FechaInicio, servicio.FechaFin, servicio.Cupo, servicio.Precio, servicio.Foto]);
                const result = response.rows[0];
                console.log(result);
                lista.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield database_1.pool.query('INSERT INTO ServicioPlato (IdServicio, IdPlato) VALUES ($1, $2)', [result.id, element === null || element === void 0 ? void 0 : element.id]);
                }));
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //obtener lista de servicios
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
}
exports.default = ServicioController;

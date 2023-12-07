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
class ServicioCapaDato {
    //crear nuevo servicio
    static createServicio(servicio, lista) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                yield client.query('BEGIN');
                const response = yield client.query('INSERT INTO Servicio (Nombre, Descripcion, FechaInicio, FechaFin, Cupo, Precio, Foto) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [servicio.Nombre, servicio.Descripcion, servicio.FechaInicio, servicio.FechaFin, servicio.Cupo, servicio.Precio, servicio.Foto]);
                const result = response.rows[0];
                lista.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield client.query('INSERT INTO ServicioPlato (IdServicio, IdPlato) VALUES ($1, $2)', [result.id, element === null || element === void 0 ? void 0 : element.id]);
                }));
                yield client.query('COMMIT');
                return result;
            }
            catch (error) {
                yield client.query('ROLLBACK');
                throw error;
            }
            finally {
                client.release();
            }
        });
    }
    //actualizar servicio
    static updateServicio(servicio, lista) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                yield client.query('BEGIN');
                yield client.query('DELETE FROM ServicioPlato WHERE IdServicio = $1', [servicio.ID]);
                const response = yield client.query(`UPDATE Servicio 
          SET Nombre = $1, 
              Descripcion = $2, 
              FechaInicio = $3, 
              FechaFin = $4, 
              Cupo = $5, 
              Precio = $6,
              Foto = $7
          WHERE ID = $8 RETURNING *`, [servicio.Nombre, servicio.Descripcion, servicio.FechaInicio, servicio.FechaFin, servicio.Cupo, servicio.Precio, servicio.Foto, servicio.ID]);
                lista.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield client.query('INSERT INTO ServicioPlato (IdServicio, IdPlato) VALUES ($1, $2)', [servicio.ID, element === null || element === void 0 ? void 0 : element.id]);
                }));
                yield client.query('COMMIT');
                return response.rows[0];
            }
            catch (error) {
                yield client.query('ROLLBACK');
                throw error;
            }
            finally {
                client.release();
            }
        });
    }
    //obtener lista de servicios
    static obtenerListaServicios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query(`
      SELECT
      s.*,
      
      json_agg(
          jsonb_build_object(
              'servicio_plato_id', sp.ID,
        'servicio_id',s.id,
              'id', p.ID,
              'nombre', p.Nombre,
              'descripcion', p.Descripcion,
              'foto', p.Foto
          )
      ) AS Lista
      
  FROM
      Servicio s
  LEFT JOIN
      ServicioPlato sp ON s.ID = sp.IdServicio
  LEFT JOIN
      Plato p ON sp.IdPlato = p.ID
  GROUP BY
      s.ID;`);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //eliminar servicio
    static deleteServicio(servicioID) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                yield client.query('BEGIN');
                yield client.query('DELETE FROM ServicioPlato WHERE IdServicio = $1', [servicioID]);
                const response = yield client.query('DELETE FROM Servicio WHERE ID = $1 RETURNING *', [servicioID]);
                yield client.query('COMMIT');
                return response.rows[0];
            }
            catch (error) {
                yield client.query('ROLLBACK');
                throw error;
            }
            finally {
                client.release();
            }
        });
    }
    static obtenerListaServiciosPorFechaSinToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query(`
        SELECT
          s.*,
          json_agg(
            jsonb_build_object(
              'servicio_plato_id', sp.ID,
              'servicio_id', s.id,
              'id', p.ID,
              'nombre', p.Nombre,
              'descripcion', p.Descripcion,
              'foto', p.Foto
            )
          ) AS Lista
        FROM
          Servicio s
        LEFT JOIN
          ServicioPlato sp ON s.ID = sp.IdServicio
        LEFT JOIN
          Plato p ON sp.IdPlato = p.ID
        WHERE
          TO_DATE(s.FechaFin, 'YYYY-MM-DD') >= CURRENT_DATE
        GROUP BY
          s.ID;
      `);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ServicioCapaDato;

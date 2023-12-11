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
class ReservaCapaDato {
    static createReserva(reserva) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                yield client.query('BEGIN');
                // Obtener información del servicio
                const servicio = yield client.query('SELECT * FROM Servicio WHERE ID = $1 FOR UPDATE', [reserva.IdServicio]);
                // Validar cupo disponible
                const cupoDisponible = servicio.rows[0].cupo;
                if (reserva.Cupo > cupoDisponible) {
                    throw new Error('No hay suficientes cupos disponibles para realizar la reserva.');
                }
                // Calcular el Total
                const Total = servicio.rows[0].precio * reserva.Cupo;
                // Insertar reserva
                const response = yield client.query('INSERT INTO Reserva (FechaReserva, FechaServicio, Cupo, Observacion, Estado, Total, IdUsuario, IdServicio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [reserva.FechaReserva, servicio.rows[0].fechainicio, reserva.Cupo, reserva.Observacion, reserva.Estado, Total, reserva.IdUsuario, reserva.IdServicio]);
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
    static updateReserva(reserva) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                yield client.query('BEGIN');
                const servicio = yield client.query('SELECT * FROM Servicio WHERE ID = $1 FOR UPDATE', [reserva.IdServicio]);
                const reservaData = yield client.query('SELECT * FROM Reserva WHERE ID = $1 FOR UPDATE', [reserva.ID]);
                const cupoDisponible = servicio.rows[0].cupo;
                const FechaServicio = servicio.rows[0].fechainicio;
                const Total = servicio.rows[0].precio * reserva.Cupo;
                if (servicio.rows[0].id === reserva.ID &&
                    reservaData.rows[0].cupo === reserva.Cupo &&
                    reservaData.rows[0].fechareserva === reserva.FechaReserva &&
                    reservaData.rows[0].fechaservicio === FechaServicio &&
                    reservaData.rows[0].observacion === reserva.Observacion &&
                    reservaData.rows[0].estado === reserva.Estado &&
                    reservaData.rows[0].total === Total &&
                    reservaData.rows[0].idusuario === reserva.IdUsuario &&
                    reservaData.rows[0].idservicio === reserva.IdServicio) {
                    return reservaData.rows[0];
                }
                if (reserva.Cupo > cupoDisponible) {
                    throw new Error('No hay suficientes cupos disponibles para realizar la reserva.');
                }
                if (reserva.Estado === 1 && reserva.Estado !== reservaData.rows[0].estado) {
                    yield client.query('UPDATE Servicio SET Cupo = Cupo - $1 WHERE ID = $2', [reserva.Cupo, reserva.IdServicio]);
                }
                if ((reserva.Estado === 1 && reserva.Estado === reservaData.rows[0].estado) || reserva.Cupo !== reservaData.rows[0].cupo) {
                    let cupo = 0;
                    if (reserva.Cupo > reservaData.rows[0].cupo) {
                        cupo = reserva.Cupo - reservaData.rows[0].cupo;
                        yield client.query('UPDATE Servicio SET Cupo = Cupo - $1 WHERE ID = $2', [cupo, reserva.IdServicio]);
                    }
                    else {
                        cupo = reservaData.rows[0].cupo - reserva.Cupo;
                        yield client.query('UPDATE Servicio SET Cupo = Cupo + $1 WHERE ID = $2', [cupo, reserva.IdServicio]);
                    }
                }
                if (reservaData.rows[0].estado === 1 && (reserva.Estado === 2 || reserva.Estado === 0)) {
                    yield client.query('UPDATE Servicio SET Cupo = Cupo + $1 WHERE ID = $2', [reservaData.rows[0].cupo, reserva.IdServicio]);
                }
                const response = yield client.query(`UPDATE Reserva 
                SET FechaReserva = $1, 
                FechaServicio = $2, 
                Cupo = $3, 
                Observacion = $4, 
                Estado = $5,
                Total = $6, 
                IdUsuario = $7, 
                IdServicio = $8
                WHERE ID = $9 RETURNING *`, [reserva.FechaReserva, FechaServicio, reserva.Cupo, reserva.Observacion, reserva.Estado, Total, reserva.IdUsuario, reserva.IdServicio, reserva.ID]);
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
    static obtenerListaReservas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query(`SELECT r.*,
            u.Nombre AS NombreUsuario,
            u.Apellido AS ApellidoUsuario,
            s.Nombre AS NombreServicio
            FROM Reserva r 
            JOIN Usuario u ON r.IdUsuario = u.ID
            JOIN Servicio s ON r.IdServicio = s.ID
            ORDER BY r.ID ASC`);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static obtenerListaReservasUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query(`SELECT r.*,
            u.Nombre AS NombreUsuario,
            u.Apellido AS ApellidoUsuario,
            s.Nombre AS NombreServicio
            FROM Reserva r
            JOIN Usuario u ON r.IdUsuario = u.ID
            JOIN Servicio s ON r.IdServicio = s.ID
            WHERE r.IdUsuario=$1
            ORDER BY r.ID ASC`, [idUser]);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteReserva(reservaID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query('DELETE FROM Reserva WHERE ID = $1 RETURNING *', [reservaID]);
                return response.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ReservaCapaDato;

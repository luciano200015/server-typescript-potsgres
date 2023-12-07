import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import Reserva from '../../models/Reserva';

class ReservaCapaDato {
    static async createReserva(reserva: Reserva): Promise<QueryResult> {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Obtener información del servicio
            const servicio: QueryResult = await client.query('SELECT * FROM Servicio WHERE ID = $1 FOR UPDATE', [reserva.IdServicio]);

            // Validar cupo disponible
            const cupoDisponible = servicio.rows[0].cupo;
            if (reserva.Cupo > cupoDisponible) {
                throw new Error('No hay suficientes cupos disponibles para realizar la reserva.');
            }

            // Calcular el Total
            const Total = servicio.rows[0].precio * reserva.Cupo;

            // Insertar reserva
            const response: QueryResult = await client.query(
                'INSERT INTO Reserva (FechaReserva, FechaServicio, Cupo, Observacion, Estado, Total, IdUsuario, IdServicio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [reserva.FechaReserva, servicio.rows[0].fechainicio, reserva.Cupo, reserva.Observacion, reserva.Estado, Total, reserva.IdUsuario, reserva.IdServicio]
            );
            // Actualizar cupo en la tabla Servicio
            //await client.query('UPDATE Servicio SET Cupo = Cupo - $1 WHERE ID = $2', [reserva.Cupo, reserva.IdServicio]);

            await client.query('COMMIT');
            return response.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }


    static async updateReserva(reserva: Reserva): Promise<QueryResult> {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const servicio: QueryResult = await client.query('SELECT * FROM Servicio WHERE ID = $1 FOR UPDATE', [reserva.IdServicio]);
            const reservaData: QueryResult = await client.query('SELECT * FROM Reserva WHERE ID = $1 FOR UPDATE', [reserva.ID]);

            const cupoDisponible = servicio.rows[0].cupo;
            
            if (reserva.Cupo > cupoDisponible) {
                throw new Error('No hay suficientes cupos disponibles para realizar la reserva.');
            }
            
            const FechaServicio = servicio.rows[0].fechainicio;
            const Total = servicio.rows[0].precio * reserva.Cupo;

            const response: QueryResult = await client.query(
                `UPDATE Reserva 
                SET FechaReserva = $1, 
                FechaServicio = $2, 
                Cupo = $3, 
                Observacion = $4, 
                Estado = $5,
                Total = $6, 
                IdUsuario = $7, 
                IdServicio = $8
                WHERE ID = $9 RETURNING *`,
                [reserva.FechaReserva, FechaServicio, reserva.Cupo, reserva.Observacion, reserva.Estado, Total, reserva.IdUsuario, reserva.IdServicio, reserva.ID]
            );
            if (reserva.Estado === 1 && reserva.Estado !== reservaData.rows[0].estado) {
                await client.query('UPDATE Servicio SET Cupo = Cupo - $1 WHERE ID = $2', [reserva.Cupo, reserva.IdServicio]);
            }
            if (reservaData.rows[0].estado===1&&(reserva.Estado===2 || reserva.Estado===0)) {
                await client.query('UPDATE Servicio SET Cupo = Cupo + $1 WHERE ID = $2', [reservaData.rows[0].cupo, reserva.IdServicio]);
            }

            await client.query('COMMIT');
            return response.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async obtenerListaReservas(): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(`SELECT r.*,
            u.Nombre AS NombreUsuario,
            u.Apellido AS ApellidoUsuario,
            s.Nombre AS NombreServicio
            FROM Reserva r 
            JOIN Usuario u ON r.IdUsuario = u.ID
            JOIN Servicio s ON r.IdServicio = s.ID
            ORDER BY r.ID ASC`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerListaReservasUser(idUser: number): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(`SELECT r.*,
            u.Nombre AS NombreUsuario,
            u.Apellido AS ApellidoUsuario,
            s.Nombre AS NombreServicio
            FROM Reserva r
            JOIN Usuario u ON r.IdUsuario = u.ID
            JOIN Servicio s ON r.IdServicio = s.ID
            WHERE r.IdUsuario=$1
            ORDER BY r.ID ASC`, [idUser]);
            return response;
        } catch (error) {
            throw error;
        }
    }
    static async deleteReserva(reservaID: number): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(
                'DELETE FROM Reserva WHERE ID = $1 RETURNING *',
                [reservaID]
            );
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default ReservaCapaDato;

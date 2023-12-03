import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import Reserva from '../../models/Reserva';

class ReservaController {
    static async createReserva(reserva: Reserva): Promise<QueryResult> {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const servicio: QueryResult = await client.query('SELECT * FROM Servicio WHERE ID = $1', [reserva.IdServicio]);
            const FechaServicio = servicio.rows[0].fechainicio;
            const Total = parseFloat(servicio.rows[0].precio.replace(/\$/g, '')) * parseFloat(reserva.Cupo) ;
            console.log(servicio.rows[0].precio);
            console.log(FechaServicio);


            const response: QueryResult = await client.query(
                'INSERT INTO Reserva (FechaReserva, FechaServicio, Cupo, Observacion, Estado, Total, IdUsuario, IdServicio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [reserva.FechaReserva, FechaServicio, parseInt(reserva.Cupo) , reserva.Observacion, reserva.Estado, parseFloat(Total), reserva.IdUsuario, reserva.IdServicio]
            );
            
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

            const servicio: QueryResult = await client.query('SELECT * FROM Servicio WHERE ID = $1', [reserva.IdServicio]);
            const FechaServicio = servicio.rows[0].fechainicio;
            const Total = parseFloat(servicio.rows[0].precio.replace(/\$/g, '')) * parseFloat(reserva.Cupo) ;

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
                [reserva.FechaReserva, FechaServicio, parseInt(reserva.Cupo), reserva.Observacion, reserva.Estado,parseFloat(Total), reserva.IdUsuario, reserva.IdServicio, reserva.ID]
            );

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

export default ReservaController;

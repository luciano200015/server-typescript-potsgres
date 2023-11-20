import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import Plato from '../../models/Plato';
import Reserva from '../../models/Reserva';

class ReservaController {
    static async createReserva(reserva: Reserva): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(
                'INSERT INTO Reserva (FechaReserva, FechaServicio, Cupo, Observacion, Estado, Total, IdUsuario, IdServicio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [reserva.FechaReserva, reserva.FechaServicio, reserva.Cupo, reserva.Observacion, reserva.Estado, reserva.Total, reserva.IdUsuario, reserva.IdServicio]
            );
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateReserva(reserva: Reserva): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(
                `UPDATE Reserva 
                SET FechaReserva = $1, 
                FechaServicio = $2, 
                Cupo = $3, 
                Observacion = $4, 
                Estado = $5,
                Total = $6, 
                IdUsuario = $7, 
                IdServicio = $8, 
                WHERE ID = $9 RETURNING *`,
                [reserva.FechaReserva, reserva.FechaServicio, reserva.Cupo, reserva.Observacion, reserva.Estado, reserva.Total, reserva.IdUsuario, reserva.IdServicio, reserva.ID]
            );
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async obtenerListaReservas(): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(`SELECT * FROM Reserva`);
            return response;
        } catch (error) {
            throw error;
        }
    }
    static async obtenerListaReservasUser(idUser:number): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(`SELECT * FROM Reserva WHERE IdUsuario = $1`,[idUser]);
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

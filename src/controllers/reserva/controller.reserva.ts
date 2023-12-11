import { QueryResult } from 'pg';
//import { pool } from '../../db/database';
import Reserva from '../../models/Reserva';
import ReservaCapaDato from '../../capa-datos/reserva/capadato.reserva';

class ReservaController {
    static async createReserva(reserva: Reserva): Promise<QueryResult> {
        try {
            const response: QueryResult = await ReservaCapaDato.createReserva(reserva);
            return response;
        } catch (error) {
            throw error;
        } 
    }

    static async updateReserva(reserva: Reserva): Promise<QueryResult> {
        try {
            const response: QueryResult = await ReservaCapaDato.updateReserva(reserva);
            return response;
        } catch (error) {
            throw error;
        }
    }
    static async cancelarReserva(id: number): Promise<QueryResult> {
        try {
            const response: QueryResult = await ReservaCapaDato.cancelarReserva(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
    static async obtenerListaReservas(): Promise<QueryResult> {
        try {
            const response: QueryResult = await ReservaCapaDato.obtenerListaReservas();
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerListaReservasUser(idUser: number): Promise<QueryResult> {
        try {
            const response: QueryResult = await ReservaCapaDato.obtenerListaReservasUser(idUser);
            return response;
        } catch (error) {
            throw error;
        }
    }
    static async deleteReserva(reservaID: number): Promise<QueryResult> {
        try {
            const response: QueryResult = await ReservaCapaDato.deleteReserva(reservaID);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default ReservaController;

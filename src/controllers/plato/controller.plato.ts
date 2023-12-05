import { QueryResult } from 'pg';
//import { pool } from '../../db/database';
import Plato from '../../models/Plato';
import PlatoCapaDatos from '../../capa-datos/plato/capa-datos.plato';

class PlatoController {
    static async createPlato(plato: Plato): Promise<QueryResult> {
        try {
            const response: QueryResult = await PlatoCapaDatos.createPlato(plato);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async updatePlato(plato: Plato): Promise<QueryResult> {
        try {
            const response: QueryResult = await PlatoCapaDatos.updatePlato(plato);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerListaPlatos(): Promise<QueryResult> {
        try {
            const response: QueryResult = await PlatoCapaDatos.obtenerListaPlatos();
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async deletePlato(platoID: number): Promise<QueryResult> {
        try {
            const response: QueryResult = await PlatoCapaDatos.deletePlato(platoID);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default PlatoController;

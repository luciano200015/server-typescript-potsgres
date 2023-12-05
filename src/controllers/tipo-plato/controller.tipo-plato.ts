import { QueryResult } from 'pg';
//import { pool } from '../../db/database';
import TipoPlato from '../../models/TipoPlato';
import CapaDatoTipoPlato from '../../capa-datos/tipo-plato/capadato.tipo-plato';

class ControllersTipoPlato {

    static async createTipoPlato(tipoplato: TipoPlato): Promise<QueryResult> {
        try {
            const response: QueryResult = await CapaDatoTipoPlato.createTipoPlato(tipoplato);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async updateTipoPlato(tipoplato: TipoPlato): Promise<QueryResult> {
        try {
            const response: QueryResult = await CapaDatoTipoPlato.updateTipoPlato(tipoplato);
            console.log(response)
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerListaTipoPlato(): Promise<QueryResult> {
        try {
          const response: QueryResult = await CapaDatoTipoPlato.obtenerListaTipoPlato()
          return response;
        } catch (error) {
          throw error;
        }
    }

    static async deleteTipoPlato(tipoPlatoID: number): Promise<QueryResult> {
        try {
            const response: QueryResult = await CapaDatoTipoPlato.deleteTipoPlato(tipoPlatoID)
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default ControllersTipoPlato;
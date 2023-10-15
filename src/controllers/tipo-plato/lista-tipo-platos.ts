import { QueryResult } from 'pg';
import { pool } from '../../db/database';

class ListaControllerTipoPlato {
  static async obtenerListaTipoPlato(): Promise<QueryResult> {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM TipoPlato ORDER BY ID ASC');
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ListaControllerTipoPlato;

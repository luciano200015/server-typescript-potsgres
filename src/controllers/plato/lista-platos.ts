import { QueryResult } from 'pg';
import { pool } from '../../db/database';

class ListaControllerPlato {
  static async obtenerListaPlatos(): Promise<QueryResult> {
    try {
      const response: QueryResult = await pool.query(`
      SELECT
      p.*,
      tp.Nombre AS TipoPlatoNombre,
      u.Nombre AS NombreUsuario
    FROM Plato p
    JOIN TipoPlato tp ON p.IdTipoPlato = tp.ID
    JOIN Usuario u ON p.IdUsuario = u.ID;
      `);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ListaControllerPlato;

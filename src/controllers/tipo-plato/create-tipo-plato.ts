import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import TipoPlato from '../../models/TipoPlato';

class CreateControllersTipoPlato {
    static async createTipoPlato(tipoplato: TipoPlato): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query('INSERT INTO TipoPlato (Nombre, Descripcion, IdUsuario) VALUES ($1, $2, $3) RETURNING *' , [tipoplato.Nombre, tipoplato.Descripcion, tipoplato.IdUsuario]);
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default CreateControllersTipoPlato;
import { QueryResult } from 'pg';
import { pool } from '../../db/database';

class DeleteControllerTipoPlato {
    static async deleteTipoPlato(tipoPlatoID: number): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(
                'DELETE FROM TipoPlato WHERE ID = $1 RETURNING *',
                [tipoPlatoID]
            );
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default DeleteControllerTipoPlato;

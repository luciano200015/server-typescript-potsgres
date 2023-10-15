import { QueryResult } from 'pg';
import { pool } from '../../db/database';

class DeletePlatoController {
    static async deletePlato(platoID: number): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(
                'DELETE FROM Plato WHERE ID = $1 RETURNING *',
                [platoID]
            );
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default DeletePlatoController;

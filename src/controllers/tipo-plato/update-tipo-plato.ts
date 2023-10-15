import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import TipoPlato from '../../models/TipoPlato';

class UpdateControllersTipoPlato {
    static async updateTipoPlato(tipoplato: TipoPlato): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(
                'UPDATE TipoPlato SET Nombre = $1, Descripcion = $2, IdUsuario = $3 WHERE ID = $4 RETURNING *',
                [tipoplato.Nombre, tipoplato.Descripcion, tipoplato.IdUsuario,tipoplato.ID]
            );
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default UpdateControllersTipoPlato;

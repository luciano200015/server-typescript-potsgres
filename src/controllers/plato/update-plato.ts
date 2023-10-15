import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import Plato from '../../models/Plato';

class UpdatePlatoController {
    static async updatePlato(plato: Plato): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(
                'UPDATE Plato SET Nombre = $1, Descripcion = $2, IdUsuario = $3, IdTipoPlato = $4, Estado = $5, Foto = $6 WHERE ID = $7 RETURNING *',
                [plato.Nombre, plato.Descripcion, plato.IdUsuario, plato.IdTipoPlato, plato.Estado, plato.Foto, plato.ID]
            );
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default UpdatePlatoController;

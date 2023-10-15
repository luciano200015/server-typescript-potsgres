import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import Plato from '../../models/Plato';

class CreatePlatoController {
    static async createPlato(plato: Plato): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(
                'INSERT INTO Plato (Nombre, Descripcion, IdUsuario, IdTipoPlato, Estado, Foto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [plato.Nombre, plato.Descripcion, plato.IdUsuario, plato.IdTipoPlato, plato.Estado, plato.Foto]
            );
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default CreatePlatoController;

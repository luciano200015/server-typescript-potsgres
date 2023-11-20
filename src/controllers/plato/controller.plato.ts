import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import Plato from '../../models/Plato';

class PlatoController {
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

    static async updatePlato(plato: Plato): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(
                `UPDATE Plato 
                SET Nombre = $1, 
                Descripcion = $2, 
                IdUsuario = $3, 
                IdTipoPlato = $4, 
                Estado = $5, 
                Foto = $6 
                WHERE ID = $7 RETURNING *`,
                [plato.Nombre, plato.Descripcion, plato.IdUsuario, plato.IdTipoPlato, plato.Estado, plato.Foto, plato.ID]
            );
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }

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

export default PlatoController;

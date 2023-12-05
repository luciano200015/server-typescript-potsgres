import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import TipoPlato from '../../models/TipoPlato';

class CapaDatoTipoPlato {

    static async createTipoPlato(tipoplato: TipoPlato): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query('INSERT INTO TipoPlato (Nombre, Descripcion, IdUsuario) VALUES ($1, $2, $3) RETURNING *' , [tipoplato.Nombre, tipoplato.Descripcion, tipoplato.IdUsuario]);
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateTipoPlato(tipoplato: TipoPlato): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(
                `UPDATE TipoPlato
                SET Nombre = $1, Descripcion = $2, IdUsuario = $3
                WHERE ID = $4
                RETURNING TipoPlato.*, 
                          (SELECT Nombre FROM Usuario WHERE ID = $3) AS NombreUsuario,
                          (SELECT Apellido FROM Usuario WHERE ID = $3) AS ApellidoUsuario`,
                [tipoplato.Nombre, tipoplato.Descripcion, tipoplato.IdUsuario,tipoplato.ID]
            );
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async obtenerListaTipoPlato(): Promise<QueryResult> {
        try {
          const response: QueryResult = await pool.query(`SELECT tp.*,
            u.Nombre AS NombreUsuario,
            u.Apellido AS ApellidoUsuario
            FROM TipoPlato tp
            JOIN Usuario u ON tp.IdUsuario = u.ID
            ORDER BY tp.ID ASC`);
          return response;
        } catch (error) {
          throw error;
        }
    }

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

export default CapaDatoTipoPlato;
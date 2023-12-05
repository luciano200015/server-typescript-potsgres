import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import Usuario from '../../models/User';



class RegisterCapaDatosUser {
    static async registerUser(usuario: Usuario): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query('INSERT INTO Usuario (Nombre, Apellido, Correo, Telefono, Contraseña, Estado, EsAdmin, EsAnfitrion, Foto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *' , [usuario.Nombre, usuario.Apellido, usuario.Correo, usuario.Telefono,usuario.Contraseña, usuario.Estado, usuario.EsAdmin, usuario.EsAnfitrion, usuario.Foto]);
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default RegisterCapaDatosUser;
import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import Usuario from '../../models/User';

class RegisterControllersUser {
    static async registerUser(usuario: Usuario): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query('INSERT INTO usuarios (Nombre, Apellido, Correo, Telefono, Estado, EsAdmin, EsAnfitrion, Foto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [usuario.Nombre, usuario.Apellido, usuario.Correo, usuario.Telefono, usuario.Estado, usuario.EsAdmin, usuario.EsAnfitrion, usuario.Foto]);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default RegisterControllersUser;




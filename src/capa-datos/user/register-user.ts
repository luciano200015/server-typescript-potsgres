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
    static async updateUser(usuario: Usuario): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query(
                `UPDATE Usuario 
                SET Nombre = $1, 
                Apellido = $2, 
                Correo = $3, 
                Telefono = $4, 
                Contraseña = $5, 
                Estado = $6, 
                EsAdmin = $7, 
                EsAnfitrion = $8, 
                Foto = $9
                WHERE ID = $10`
             , [usuario.Nombre, usuario.Apellido, usuario.Correo, usuario.Telefono,usuario.Contraseña, usuario.Estado, usuario.EsAdmin, usuario.EsAnfitrion, usuario.Foto,usuario.ID]);
            return response.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default RegisterCapaDatosUser;
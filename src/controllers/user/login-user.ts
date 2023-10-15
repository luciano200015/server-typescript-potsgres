import { QueryResult } from 'pg';
import { pool } from '../../db/database';

class LoginControllersUser {
    static async loginUser(Correo: String,Contraseña:String): Promise<QueryResult> {
        try {
            console.log(Contraseña,Correo)
            const response: QueryResult = await pool.query('SELECT * FROM usuario WHERE Correo = $1 AND Contraseña = $2' , [Correo,Contraseña]);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default LoginControllersUser;
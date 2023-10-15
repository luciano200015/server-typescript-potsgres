import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import Usuario from '../../models/User';



class RegisterControllersUser {
    static async registerUser(Correo: string,Contraseña:string): Promise<QueryResult> {
        try {
            const response: QueryResult = await pool.query('SELECT * FROM usuario WHERE Correo=$1 AND Contraseña=$2' , [Correo,Contraseña]);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default RegisterControllersUser;




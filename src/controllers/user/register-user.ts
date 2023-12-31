import { QueryResult } from 'pg';
//import { pool } from '../../db/database';
import Usuario from '../../models/User';
import RegisterCapaDatosUser from '../../capa-datos/user/register-user';



class RegisterControllersUser {
    static async registerUser(usuario: Usuario): Promise<QueryResult> {
        try {
            const response: QueryResult = await RegisterCapaDatosUser.registerUser(usuario);
            return response;
        } catch (error) {
            throw error;
        }
    }
    static async updateUser(usuario: Usuario): Promise<QueryResult> {
        try {
            const response: QueryResult = await RegisterCapaDatosUser.updateUser(usuario);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default RegisterControllersUser;
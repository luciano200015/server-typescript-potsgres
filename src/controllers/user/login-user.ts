import { QueryResult } from 'pg';
import LoginCapaDatos from '../../capa-datos/user/login-user';

class LoginControllersUser {
    static async loginUser(Correo: String,Contraseña:String): Promise<QueryResult> {
        try {
            const response: QueryResult = await LoginCapaDatos.loginUser(Correo,Contraseña);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default LoginControllersUser;
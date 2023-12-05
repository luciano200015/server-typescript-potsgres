import { QueryResult } from 'pg';
//import { pool } from '../../db/database';
import ListasCapaDatosUsers from '../../capa-datos/user/lista-users';

class ListasControllersUsers {
  static async obteneUsers(): Promise<QueryResult> {
    try {
      const response: QueryResult = await ListasCapaDatosUsers.obteneUsers();
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ListasControllersUsers;

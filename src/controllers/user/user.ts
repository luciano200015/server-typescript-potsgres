import { QueryResult } from 'pg';
import { pool } from '../../db/database';

class ListasControllersUsers {
  static async obteneUsers(): Promise<QueryResult> {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM users ORDER BY id ASC');
      return response;
    } catch (error) {
      throw error; 
    }
  }
}

export default ListasControllersUsers;

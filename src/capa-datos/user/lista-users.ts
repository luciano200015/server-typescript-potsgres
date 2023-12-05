import { QueryResult } from 'pg';
import { pool } from '../../db/database';

class ListasCapaDatosUsers {
  static async obteneUsers(): Promise<QueryResult> {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM usuario ORDER BY ID ASC');
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ListasCapaDatosUsers;

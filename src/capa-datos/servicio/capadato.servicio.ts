import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import Servicio from '../../models/Servicio';

class ServicioCapaDato {

  //crear nuevo servicio
  static async createServicio(servicio: Servicio, lista: any): Promise<QueryResult> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const response: QueryResult = await client.query(
        'INSERT INTO Servicio (Nombre, Descripcion, FechaInicio, FechaFin, Cupo, Precio, Foto) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [servicio.Nombre, servicio.Descripcion, servicio.FechaInicio, servicio.FechaFin, servicio.Cupo, servicio.Precio, servicio.Foto]
      );
      const result = response.rows[0];

      lista.forEach(async (element: { id: any }) => {
        await client.query(
          'INSERT INTO ServicioPlato (IdServicio, IdPlato) VALUES ($1, $2)',
          [result.id, element?.id]
        );
      });

      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  //actualizar servicio
  static async updateServicio(servicio: Servicio, lista: any): Promise<QueryResult> {
    const client = await pool.connect(); 

    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM ServicioPlato WHERE IdServicio = $1', [servicio.ID]);
      const response: QueryResult = await client.query(
        `UPDATE Servicio 
          SET Nombre = $1, 
              Descripcion = $2, 
              FechaInicio = $3, 
              FechaFin = $4, 
              Cupo = $5, 
              Precio = $6,
              Foto = $7
          WHERE ID = $8 RETURNING *`,
        [servicio.Nombre, servicio.Descripcion, servicio.FechaInicio, servicio.FechaFin, servicio.Cupo, servicio.Precio, servicio.Foto, servicio.ID]
      );

      lista.forEach(async (element: { id: any }) => {
        await client.query(
          'INSERT INTO ServicioPlato (IdServicio, IdPlato) VALUES ($1, $2)',
          [servicio.ID, element?.id]
        );
      });

      await client.query('COMMIT'); 
      return response.rows[0];
    } catch (error) {
      await client.query('ROLLBACK'); 
      throw error;
    } finally {
      client.release();
    }
  }

  //obtener lista de servicios
  static async obtenerListaServicios(): Promise<QueryResult> {
    try {
      const response: QueryResult = await pool.query(`
      SELECT
      s.*,
      
      json_agg(
          jsonb_build_object(
              'servicio_plato_id', sp.ID,
        'servicio_id',s.id,
              'id', p.ID,
              'nombre', p.Nombre,
              'descripcion', p.Descripcion,
              'foto', p.Foto
          )
      ) AS Lista
      
  FROM
      Servicio s
  LEFT JOIN
      ServicioPlato sp ON s.ID = sp.IdServicio
      LEFT JOIN
      Plato p ON sp.IdPlato = p.ID
    WHERE
      p.Estado = 1
  GROUP BY
      s.ID;`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //eliminar servicio
   static async deleteServicio(servicioID: number): Promise<QueryResult> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN'); 
      await client.query('DELETE FROM ServicioPlato WHERE IdServicio = $1', [servicioID]);
      const response: QueryResult = await client.query(
        'DELETE FROM Servicio WHERE ID = $1 RETURNING *',
        [servicioID]
      );

      await client.query('COMMIT'); 
      return response.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }


  static async obtenerListaServiciosPorFechaSinToken(): Promise<QueryResult> {
    try {
      const response: QueryResult = await pool.query(`
        SELECT
          s.*,
          json_agg(
            jsonb_build_object(
              'servicio_plato_id', sp.ID,
              'servicio_id', s.id,
              'id', p.ID,
              'nombre', p.Nombre,
              'descripcion', p.Descripcion,
              'foto', p.Foto
            )
          ) AS Lista
        FROM
          Servicio s
        LEFT JOIN
          ServicioPlato sp ON s.ID = sp.IdServicio
        LEFT JOIN
          Plato p ON sp.IdPlato = p.ID
        WHERE
          TO_DATE(s.FechaFin, 'YYYY-MM-DD') >= CURRENT_DATE
          AND p.Estado = 1
        GROUP BY
          s.ID;
      `);
      return response;
    } catch (error) {
      throw error;
    }
  }
  
}

export default ServicioCapaDato;

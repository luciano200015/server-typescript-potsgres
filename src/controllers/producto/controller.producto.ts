import { QueryResult } from 'pg';
import { pool } from '../../db/database';
import Servicio from '../../models/Servicio';
import Producto from '../../models/Producto';

class ProductoController {

  //crear nuevo Producto
  static async createProducto(Producto: Producto): Promise<QueryResult> {
    try {
      const response: QueryResult = await pool.query(
        'INSERT INTO Producto (Nombre, Descripcion, Foto, Precio, Stock, Estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [Producto.Nombre, Producto.Descripcion, Producto.Foto, Producto.Precio, Producto.Stock, Producto.Estado]
      );
      const result = response.rows[0];
      return result;
    } catch (error) {
      throw error;
    }
  }
  //actualizar Producto
  static async updateProducto(Producto: Producto): Promise<QueryResult> {
    try {
      const response: QueryResult = await pool.query(
        `UPDATE Producto 
            SET Nombre = $1, 
            Descripcion = $2, 
            Foto = $3, 
            Precio = $4, 
            Stock = $5, 
            Estado = $6
            WHERE ID = $7 RETURNING *`,
        [Producto.Nombre, Producto.Descripcion, Producto.Foto, Producto.Precio, Producto.Stock, Producto.Estado, Producto.ID]
      );
      
      return response.rows[0];
    } catch (error) {
      throw error;
    }
  }

  //obtener lista de Producto
  static async obtenerListaProductos(): Promise<QueryResult> {
    try {
      const response: QueryResult = await pool.query(`SELECT * FROM Producto`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //eliminar Producto
  static async deleteProducto(productoID: number): Promise<QueryResult> {
    try {
      const response: QueryResult = await pool.query(
        'DELETE FROM Producto WHERE ID = $1 RETURNING *',
        [productoID]
      );
      return response.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default ProductoController;

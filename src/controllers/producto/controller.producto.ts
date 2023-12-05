import { QueryResult } from 'pg';
//import { pool } from '../../db/database';
import Producto from '../../models/Producto';
import ProductoCapaDato from '../../capa-datos/producto/capadato.producto';

class ProductoController {

  //crear nuevo Producto
  static async createProducto(Producto: Producto): Promise<QueryResult> {
    try {
      const response: QueryResult = await ProductoCapaDato.createProducto(Producto);
      return response;
    } catch (error) {
      throw error;
    }
  }
  //actualizar Producto
  static async updateProducto(Producto: Producto): Promise<QueryResult> {
    try {
      const response: QueryResult = await ProductoCapaDato.updateProducto(Producto)
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  //obtener lista de Producto
  static async obtenerListaProductos(): Promise<QueryResult> {
    try {
      const response: QueryResult = await ProductoCapaDato.obtenerListaProductos();
      return response;
    } catch (error) {
      throw error;
    }
  }

  //eliminar Producto
  static async deleteProducto(productoID: number): Promise<QueryResult> {
    try {
      const response: QueryResult = await ProductoCapaDato.deleteProducto(productoID);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductoController;

import { QueryResult } from 'pg';
//import { pool } from '../../db/database';
import Servicio from '../../models/Servicio';
import ServicioCapaDato from '../../capa-datos/servicio/capadato.servicio';

class ServicioController {

  //crear nuevo servicio
  static async createServicio(servicio: Servicio, lista: any): Promise<QueryResult> {
    try {
      const response: QueryResult = await ServicioCapaDato.createServicio(servicio,lista);
      return response;
    } catch (error) {
      throw error;
    } 
  }
  //actualizar servicio
  static async updateServicio(servicio: Servicio, lista: any): Promise<QueryResult> {

    try {
    
      const response: QueryResult = await ServicioCapaDato.updateServicio(servicio,lista);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //obtener lista de servicios
  static async obtenerListaServicios(): Promise<QueryResult> {
    try {
      const response: QueryResult = await ServicioCapaDato.obtenerListaServicios();
      return response;
    } catch (error) {
      throw error;
    }
  }

  //eliminar servicio
   static async deleteServicio(servicioID: number): Promise<QueryResult> {
    try {
      const response: QueryResult = await ServicioCapaDato.deleteServicio(servicioID);
      return response;
    } catch (error) {
      throw error;
    } 
  }


  static async obtenerListaServiciosPorFechaSinToken(): Promise<QueryResult> {
    try {
      const response: QueryResult = await ServicioCapaDato.obtenerListaServiciosPorFechaSinToken();
      return response;
    } catch (error) {
      throw error;
    }
  }
  
}

export default ServicioController;

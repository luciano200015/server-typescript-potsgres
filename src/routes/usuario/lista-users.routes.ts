import express from 'express';
import UserController from '../../controllers/user/lista-users';

const obtenerUsuariosRoute = express.Router();

obtenerUsuariosRoute.get('/obtenerusuarios', async (req, res) => {
  try {
    const results = await UserController.obteneUsers();
    
    res.status(200).json({
      message: "Usuarios obtenidos con éxito",
      results: results.rows,
    });

  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

export default obtenerUsuariosRoute;

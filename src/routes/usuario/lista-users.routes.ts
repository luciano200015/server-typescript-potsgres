import express from 'express';
import UserController from '../../controllers/user/lista-users';
import validarToken from '../../validarToken';

const obtenerUsuariosRoute = express.Router();
obtenerUsuariosRoute.use(validarToken);

obtenerUsuariosRoute.get('/obtenerusuarios', async (req, res) => {
  try {
    const results = await UserController.obteneUsers();
    res.status(200).json({
      message: "Usuarios obtenidos con éxito",
      results: results.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default obtenerUsuariosRoute;

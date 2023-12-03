import express from 'express';
import jwt from "jsonwebtoken";
import LoginControllersUser from '../../controllers/user/login-user';

const loginUsuarioRoute = express.Router();

loginUsuarioRoute.post('/loginuser', async (req, res) => {
    try {
        const { Correo, Contrasena } = req.body;
        const results = await LoginControllersUser.loginUser(Correo, Contrasena);
        console.log(results)
        if (results.rows.length === 0) {
            res.status(200).json({
                message: "Contraseña o correo incorecto",
                results: null,
                token: null,
                auth: false
            });
            return;
        }
        if (results.rows[0].estado === 0) {
            res.status(200).json({
                message: "Usuario Bloqueado",
                results: null,
                token: null,
                auth: false
            });
            return;
        }
        const token = jwt.sign({ Correo: Correo }, 'LucianoSoruco', { expiresIn: '14h' });

        res.status(200).json({
            message: "logueado con exito",
            token: token,
            auth: true,
            results: results.rows[0],
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error,
            results: null,
            token: null,
            auth: false
        });
    }
});

export default loginUsuarioRoute;

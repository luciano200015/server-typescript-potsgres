import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

function validarToken(req: Request, res: Response, next: NextFunction) {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization || req.body.authorization;

  if (!token) {
    return res.status(401).json({ auth: false, message: 'Token no proporcionado' });
  }

  // Verificar y decodificar el token
  jwt.verify(token, 'LucianoSoruco', (err: any) => {
    if (err) {
      return res.status(403).json({ auth: false, message: 'Token inválido o expirado' });
    }
    next();
  });
}

export default validarToken;

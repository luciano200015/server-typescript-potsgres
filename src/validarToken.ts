import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'; // Asegúrate de importar los tipos Request y Response adecuados de Express

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

    // Puedes acceder a los datos decodificados, si es necesario, en la variable "decoded"
    // Por ejemplo: const userId = (decoded as { userId: string }).userId;

    next();
  });
}

export default validarToken;

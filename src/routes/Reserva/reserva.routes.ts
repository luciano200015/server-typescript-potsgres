import express from 'express';
import validarToken from '../validarToken';
import ReservaController from '../../controllers/reserva/controller.reserva';
import Reserva from '../../models/Reserva';

const ReservaRoute = express.Router();
ReservaRoute.use(validarToken);

ReservaRoute.post('/createreserva', async (req, res, next) => {
  const { FechaReserva, Cupo, Observacion, IdUsuario, IdServicio } = req.body;
  try {
    const newReserva = new Reserva(FechaReserva, parseInt(Cupo), Observacion,2, parseInt(IdUsuario), parseInt(IdServicio));
    const result = await ReservaController.createReserva(newReserva);
    res.status(201).json({ results: result, message: 'reserva creada exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ results: null, message: error });
  }
});

ReservaRoute.put('/updatereserva/:id', async (req, res, next) => {
  const { FechaReserva, Cupo, Observacion, Estado, IdUsuario, IdServicio } = req.body;
  const reservaID = parseInt(req.params.id);

  try {
    const newReserva = new Reserva(FechaReserva, parseInt(Cupo), Observacion, parseInt(Estado), parseInt(IdUsuario), parseInt(IdServicio),'',0,reservaID);
    //console.log(newReserva)
    const result = await ReservaController.updateReserva(newReserva);
    res.status(201).json({ results: result, message: 'Reserva actualizado exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ results: null, message: error });
  }
});
ReservaRoute.put('/cancelarreserva/:id', async (req, res, next) => {
  const reservaID = parseInt(req.params.id);

  try {
    const result = await ReservaController.cancelarReserva(reservaID);
    res.status(201).json({ results: result, message: 'Reserva cancelada exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ results: null, message: error });
  }
});

ReservaRoute.get('/obtenerlistareservas', async (req, res) => {
  try {
    const results = await ReservaController.obtenerListaReservas();
    res.status(200).json({
      message: "Lista de reserva obtenido con éxito",
      results: results.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error, results: null });
  }
});

ReservaRoute.get('/obtenerlistareservasuser/:id', async (req, res) => {
  const userID = parseInt(req.params.id);
  try {
    const results = await ReservaController.obtenerListaReservasUser(userID);
    res.status(200).json({
      message: "Lista de reserva obtenido con éxito",
      results: results.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error, results: null });
  }
});

ReservaRoute.delete('/deletereserva/:id', async (req, res, next) => {
  const reservaID = parseInt(req.params.id);
  try {
    const result = await ReservaController.deleteReserva(reservaID);
    console.log(result);
    res.status(200).json({ results: result, message: 'Reserva eliminada exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ results: null, message: error });
  }
});


export default ReservaRoute;

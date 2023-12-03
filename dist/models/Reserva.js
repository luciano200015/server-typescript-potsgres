"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reserva {
    constructor(FechaReserva, Cupo, Observacion, Estado, IdUsuario, IdServicio, FechaServicio = 'null-fecha', Total = 0, id = 0) {
        this.ID = id;
        this.FechaReserva = FechaReserva;
        this.FechaServicio = FechaServicio;
        this.Cupo = Cupo;
        this.Observacion = Observacion;
        this.Estado = Estado;
        this.Total = Total;
        this.IdUsuario = IdUsuario;
        this.IdServicio = IdServicio;
    }
}
exports.default = Reserva;

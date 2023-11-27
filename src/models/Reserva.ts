class Reserva {
    ID: number;
    FechaReserva: string;
    FechaServicio: string;
    Cupo: number;
    Observacion: string;
    Estado: number;
    Total: number;
    IdUsuario: number;
    IdServicio: number;

    constructor(FechaReserva: string,  Cupo: number, Observacion: string, Estado: number, IdUsuario: number, IdServicio: number, FechaServicio: string='null-fecha',Total:number= 0, id: number = 0) {
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

export default Reserva;
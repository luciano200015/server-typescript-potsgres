class Servicio {
    ID: number;
    Nombre: string;
    Descripcion: string;
    FechaInicio:string;
    FechaFin:string;
    Cupo: number;
    Precio: number;
    Foto: string;

    constructor(Nombre: string, Descripcion: string,FechaInicio:string,FechaFin:string, Cupo: number, Precio: number,  Foto: string, id: number = 0) {
        this.ID = id;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.FechaInicio = FechaInicio;
        this.FechaFin = FechaFin;
        this.Cupo = Cupo;
        this.Precio = Precio;
        this.Foto = Foto;
    }
}

export default Servicio;

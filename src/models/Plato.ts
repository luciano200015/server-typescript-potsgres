class Plato {
    ID: number;
    Nombre: string;
    Descripcion: string;
    IdUsuario: number;
    IdTipoPlato: number;
    Estado: number;
    Foto: string;
    constructor(Nombre: string, Descripcion: string, IdUsuario: number, IdTipoPlato: number, Estado: number, Foto: string, id: number = 0) {
        this.ID = id;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.IdUsuario = IdUsuario;
        this.Estado = Estado;
        this.Foto = Foto;
        this.IdTipoPlato = IdTipoPlato;
    }
}

export default Plato;
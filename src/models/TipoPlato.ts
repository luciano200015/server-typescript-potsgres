class TipoPlato {
    ID: number;
    Nombre: string;
    Descripcion: string;
    IdUsuario: number;
    
    constructor( Nombre: string,Descripcion: string,IdUsuario:number,id: number=0,) {
        this.ID = id;
        this.Nombre=Nombre;
        this.Descripcion=Descripcion;
        this.IdUsuario=IdUsuario;
    }
}

export default TipoPlato;
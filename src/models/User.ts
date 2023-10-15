class Usuario {
    ID: number;
    Nombre: string;
    Apellido: string;
    Correo: string;
    Telefono: string;
    Contraseña: String;
    Estado: number;
    EsAdmin: boolean;
    EsAnfitrion: boolean;
    Foto: string;

    constructor( Nombre: string,Apellido: string,Correo:string,Telefono:string,Contraseña:String, Estado:number,EsAdmin:boolean, EsAnfitrion:boolean,Foto:string,id: number=0,) {
        this.ID = id;
        this.Nombre=Nombre;
        this.Apellido=Apellido;
        this.Correo=Correo;
        this.Telefono=Telefono;
        this.Contraseña=Contraseña;
        this.Estado=Estado;
        this.EsAdmin=EsAdmin;
        this.EsAnfitrion=EsAnfitrion;
        this.Foto=Foto;
    }
}


export default Usuario;
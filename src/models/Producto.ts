class Producto {
    ID: number;
    Nombre: string;
    Descripcion: string;
    Foto: string;
    Precio: number;
    Stock: number;
    Estado: number;
    constructor(Nombre: string, Descripcion: string,  Foto: string,Precio: number, Stock: number, Estado: number, id: number = 0) {
        this.ID = id;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.Foto = Foto;
        this.Precio = Precio;
        this.Stock = Stock;
        this.Estado = Estado;
    }
}

export default Producto;
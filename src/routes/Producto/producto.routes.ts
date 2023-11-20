import express from 'express';
import validarToken from '../validarToken';
import path from 'path';
import fs from 'fs';
import ProductoController from '../../controllers/producto/controller.producto';
import Producto from '../../models/Producto';


const ProductoRoute = express.Router();
ProductoRoute.use(validarToken);
const ruta = path.resolve();


ProductoRoute.post('/createproducto', async (req, res, next) => {
  const { Nombre, Descripcion, Foto, Precio, Stock,Estado} = req.body;
  let imageName ='null';
  try {
    if (Foto.mimeType !== null || Foto.base64 !== null) {
      const imageBuffer = Buffer.from(Foto.base64, 'base64');
      imageName = `${Date.now()}${Foto.mimeType}`;
      const imagePath = path.join(ruta, 'public/imagenes-productos', imageName);
      fs.writeFileSync(imagePath, imageBuffer);
    }
    const newProducto = new Producto(Nombre, Descripcion, imageName,parseFloat(Precio), parseInt(Stock), parseInt(Estado));
    const result = await ProductoController.createProducto(newProducto);
    res.status(201).json({ results: result, message: 'Producto creado exitosamente' });
  } catch (error) {
    //console.log(error)
    res.status(500).json({ results: null, message: error });
  }
});

ProductoRoute.put('/updateproducto/:id', async (req, res, next) => {
  const { Nombre, Descripcion, Foto, Precio, Stock,Estado} = req.body;
  let imageName =Foto;
  const ProductoId = parseInt(req.params.id);
  try {
    if (Foto.mimeType !== undefined || Foto.base64 !== undefined) {
      const imageBuffer = Buffer.from(Foto.base64, 'base64');
      imageName = `${Date.now()}${Foto.mimeType}`;
      const imagePath = path.join(ruta, 'public/imagenes-productos', imageName);
      fs.writeFileSync(imagePath, imageBuffer);
    }
    const newProducto = new Producto(Nombre, Descripcion, imageName,parseFloat(Precio), parseInt(Stock), parseInt(Estado),ProductoId);
    const result = await ProductoController.updateProducto(newProducto);
    res.status(201).json({ results: result, message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ results: null, message: error });
  }
});


ProductoRoute.get('/obtenerproductos', async (req, res) => {
  try {
    const results = await ProductoController.obtenerListaProductos();
    res.status(200).json({
      message: "Lista de productos obtenido con éxito",
      results: results.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error, results: null });
  }
});

ProductoRoute.delete('/deleteproducto/:id', async (req, res, next) => {
  const productoID = parseInt(req.params.id);
  try {
    const result = await ProductoController.deleteProducto(productoID);
    res.status(200).json({ result: result, message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ result: null, message: error });
  }
});

export default ProductoRoute;

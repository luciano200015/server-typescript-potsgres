import express from 'express';
import Plato from '../../models/Plato';
import validarToken from '../validarToken';
import path from 'path';
import fs from 'fs';
import PlatoController from '../../controllers/plato/controller.plato';


const PlatoRoute = express.Router();
PlatoRoute.use(validarToken);
const ruta = path.resolve();

PlatoRoute.post('/createplato', async (req, res, next) => {
    const { Nombre, Descripcion, IdUsuario, IdTipoPlato, Estado, Foto } = req.body;
    let imageName = 'null';
    try {
        if (Foto.mimeType !== null || Foto.base64 !== null) {
            const imageBuffer = Buffer.from(Foto.base64, 'base64');
            imageName = `${Date.now()}${Foto.mimeType}`;
            const imagePath = path.join(ruta, 'public/imagenes-platos', imageName);

            fs.writeFileSync(imagePath, imageBuffer);
        }
        const newPlato = new Plato(Nombre, Descripcion, parseInt(IdUsuario), parseInt(IdTipoPlato), parseInt(Estado), imageName);
        const result = await PlatoController.createPlato(newPlato);
        res.status(201).json({ results: result, message: 'Plato creado exitosamente' });
    } catch (error) {
        res.status(500).json({ results: null, message: error });
    }
});


PlatoRoute.put('/updateplato/:id', async (req, res, next) => {
    const { Nombre, Descripcion, IdUsuario, Foto, IdTipoPlato, Estado } = req.body;
    const tipoPlatoID = parseInt(req.params.id);
    let imageName = Foto;

    try {
        if (Foto.mimeType !== undefined || Foto.base64 !== undefined) {
            const imageBuffer = Buffer.from(Foto.base64, 'base64');
            imageName = `${Date.now()}${Foto.mimeType}`;
            const imagePath = path.join(ruta, 'public/imagenes-platos', imageName);
            //console.log('imagePath: ' + imagePath);
            // Guardar la imagen en la carpeta
            fs.writeFileSync(imagePath, imageBuffer);
        }
        const updatedPlato = new Plato(Nombre, Descripcion, parseInt(IdUsuario), parseInt(IdTipoPlato), parseInt(Estado), imageName, tipoPlatoID);
        const result = await PlatoController.updatePlato(updatedPlato);
        res.status(200).json({ result: result, message: 'Plato actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ result: null, message: error });
    }
});


PlatoRoute.get('/obtenerplatos', async (req, res) => {
    try {
        const results = await PlatoController.obtenerListaPlatos();
        res.status(200).json({
            message: "Lista Platos obtenido con éxito",
            results: results.rows,
        });
    } catch (error) {
        res.status(500).json({ message: error, results: null });
    }
});


PlatoRoute.delete('/deleteplato/:id', async (req, res, next) => {
    const platoID = parseInt(req.params.id);
    try {
        const result = await PlatoController.deletePlato(platoID);
        res.status(200).json({ result: result, message: 'Plato eliminado exitosamente' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ result: null, message: error });
    }
});

export default PlatoRoute;

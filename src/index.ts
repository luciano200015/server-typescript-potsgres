import express from 'express';
import { obtenerUsuariosRoute,registerUserRoute,loginUsuarioRoute,crateTipoPlatoRoute,obteneTipoPlatoRoute 
    ,updateTipoPlatoRoute,deleteTipoPlatoRoute,
    createPlatoRoute,updatePlatoRoute,obtenePlatoRoute,deletePlatoRoute} from './routes';


const app=express();
app.use(express.json())

app.use(express.static('public'))

app.use(registerUserRoute);
app.use(loginUsuarioRoute);



//------rutas con uso de token---------------

//plato
app.use(createPlatoRoute);
app.use(updatePlatoRoute);
app.use(obtenePlatoRoute);
app.use(deletePlatoRoute);

//tipo plato
app.use(crateTipoPlatoRoute);
app.use(obteneTipoPlatoRoute);
app.use(updateTipoPlatoRoute);
app.use(deleteTipoPlatoRoute);

//usuarios
app.use(obtenerUsuariosRoute);

app.listen(9000,()=>{
    console.log('server running port 9000');
})

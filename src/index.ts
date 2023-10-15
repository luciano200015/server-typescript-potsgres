import express from 'express';
import { obtenerUsuariosRoute,registerUserRoute,loginUsuarioRoute } from './routes';

const app=express();
app.use(express.json())

app.use(express.static('public'))

app.use(registerUserRoute);
app.use(loginUsuarioRoute);


//rutas con uso de token
app.use(obtenerUsuariosRoute);


app.listen(9000,()=>{
    console.log('server running port 9000');
})

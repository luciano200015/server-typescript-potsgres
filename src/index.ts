import express from 'express';
import { obtenerUsuariosRoute,registerUserRoute } from './routes';

const app=express();
app.use(express.json())

app.use(express.static('public'))

app.use(registerUserRoute);
app.use(obtenerUsuariosRoute);


app.listen(3000,()=>{
    console.log('server running port 3000');
});


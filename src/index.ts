import express from 'express';
import { obtenerUsuariosRoute } from './routes';

const app=express();
app.use(express.json())

app.use(obtenerUsuariosRoute);

app.listen(3000,()=>{
    console.log('server running port 3000');
})

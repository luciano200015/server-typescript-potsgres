import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {
    obtenerUsuariosRoute, registerUserRoute, loginUsuarioRoute,
    TipoPlatoRoute,
    PlatoRoute,
    ServiciotoRoute,
    ServiciotoRouteSinToken,
    ProductoRoute
} from './routes';


const app = express();
app.use(bodyParser.json({ limit: '30mb' }));
app.use(cors());
app.use(express.json())


app.use(express.static('public'))


///----rutas sin uso de token----------
app.use(registerUserRoute);
app.use(loginUsuarioRoute);
app.use(ServiciotoRouteSinToken);



//------rutas con uso de token---------------

//plato

app.use(PlatoRoute)

//tipo plato
app.use(TipoPlatoRoute);


//servicios
app.use(ServiciotoRoute);

//producto
app.use(ProductoRoute);

//usuarios
app.use(obtenerUsuariosRoute);

app.listen(3000, () => {
    console.log('server running port 3000');
})

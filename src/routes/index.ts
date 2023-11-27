//usuario
import registerUserRoute from "./usuario/register-users.routes";
import loginUsuarioRoute from "./usuario/login-user.routes";

import obtenerUsuariosRoute from "./usuario/lista-users.routes";


//tipo plato
import TipoPlatoRoute from "./TipoPlato/tipo-plato.routes";

//plato

import PlatoRoute from "./Plato/plato.routes";

//servicio
import ServiciotoRoute from "./Servicio/servicio.routes";
import ServiciotoRouteSinToken from "./Servicio/servicioSinToken.routes";

//producto
import ProductoRoute from "./Producto/producto.routes";

//reserva
import ReservaRoute from "./Reserva/reserva.routes";

export {registerUserRoute,loginUsuarioRoute,obtenerUsuariosRoute,
    TipoPlatoRoute
    ,PlatoRoute,
    ServiciotoRoute,
    ServiciotoRouteSinToken,
    ProductoRoute,
    ReservaRoute
};
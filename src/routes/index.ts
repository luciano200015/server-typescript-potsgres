//usuario
import obtenerUsuariosRoute from "./usuario/lista-users.routes";
import registerUserRoute from "./usuario/register-users.routes";
import loginUsuarioRoute from "./usuario/login-user.routes";

//tipo plato
import obteneTipoPlatoRoute from "./TipoPlato/lista-tipo-platos.routes";
import crateTipoPlatoRoute from "./TipoPlato/create-tipo-plato.routes";
import updateTipoPlatoRoute from "./TipoPlato/update-tipo-plato.routes";
import deleteTipoPlatoRoute from "./TipoPlato/delete-tipo-plato.routes";

//plato
import createPlatoRoute from "./Plato/create-plato.routes";
import updatePlatoRoute from "./Plato/update-plato.routes";
import obtenePlatoRoute from "./Plato/lista-platos.routes";
import deletePlatoRoute from "./Plato/delete-plato.routes";

export {obtenerUsuariosRoute,registerUserRoute,loginUsuarioRoute,
    crateTipoPlatoRoute,obteneTipoPlatoRoute,updateTipoPlatoRoute,deleteTipoPlatoRoute
    ,createPlatoRoute,updatePlatoRoute,obtenePlatoRoute,deletePlatoRoute};
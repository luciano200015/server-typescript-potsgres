"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaRoute = exports.ProductoRoute = exports.ServiciotoRouteSinToken = exports.ServiciotoRoute = exports.PlatoRoute = exports.TipoPlatoRoute = exports.obtenerUsuariosRoute = exports.loginUsuarioRoute = exports.registerUserRoute = void 0;
//usuario
const register_users_routes_1 = __importDefault(require("./usuario/register-users.routes"));
exports.registerUserRoute = register_users_routes_1.default;
const login_user_routes_1 = __importDefault(require("./usuario/login-user.routes"));
exports.loginUsuarioRoute = login_user_routes_1.default;
const lista_users_routes_1 = __importDefault(require("./usuario/lista-users.routes"));
exports.obtenerUsuariosRoute = lista_users_routes_1.default;
//tipo plato
const tipo_plato_routes_1 = __importDefault(require("./TipoPlato/tipo-plato.routes"));
exports.TipoPlatoRoute = tipo_plato_routes_1.default;
//plato
const plato_routes_1 = __importDefault(require("./Plato/plato.routes"));
exports.PlatoRoute = plato_routes_1.default;
//servicio
const servicio_routes_1 = __importDefault(require("./Servicio/servicio.routes"));
exports.ServiciotoRoute = servicio_routes_1.default;
const servicioSinToken_routes_1 = __importDefault(require("./Servicio/servicioSinToken.routes"));
exports.ServiciotoRouteSinToken = servicioSinToken_routes_1.default;
//producto
const producto_routes_1 = __importDefault(require("./Producto/producto.routes"));
exports.ProductoRoute = producto_routes_1.default;
//reserva
const reserva_routes_1 = __importDefault(require("./Reserva/reserva.routes"));
exports.ReservaRoute = reserva_routes_1.default;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
///----rutas sin uso de token----------
app.use(routes_1.registerUserRoute);
app.use(routes_1.loginUsuarioRoute);
app.use(routes_1.ServiciotoRouteSinToken);
//plato
app.use(routes_1.PlatoRoute);
//tipo plato
app.use(routes_1.TipoPlatoRoute);
//servicios
app.use(routes_1.ServiciotoRoute);
//producto
app.use(routes_1.ProductoRoute);
//usuarios
app.use(routes_1.obtenerUsuariosRoute);
//reserva
app.use(routes_1.ReservaRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

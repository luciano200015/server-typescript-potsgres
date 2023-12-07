"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../db/database");
class LoginCapaDatos {
    static loginUser(Correo, Contraseña) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(Contraseña, Correo);
                const response = yield database_1.pool.query('SELECT * FROM Usuario WHERE Usuario.Correo = $1 AND Usuario.contraseña = $2', [Correo, Contraseña]);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = LoginCapaDatos;

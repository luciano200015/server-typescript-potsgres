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
class UpdateControllersTipoPlato {
    static updateTipoPlato(tipoplato) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query('UPDATE TipoPlato SET Nombre = $1, Descripcion = $2, IdUsuario = $3 WHERE ID = $4 RETURNING *', [tipoplato.Nombre, tipoplato.Descripcion, tipoplato.IdUsuario, tipoplato.ID]);
                return response.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UpdateControllersTipoPlato;

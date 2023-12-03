"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    //connectionString:'postgresql://postgres:1A3eb32GfFFDE3A2Dedfad116B5*5d-c@roundhouse.proxy.rlwy.net:19791/railway'
    user: 'postgres',
    host: 'localhost',
    password: '1010',
    database: 'RestauranteUdi',
    //port:19791
});

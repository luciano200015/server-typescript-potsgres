import { Pool } from "pg";

export const pool=new Pool({
    user:'postgres',
    host:'localhost',
    password:'1010',
    database:'RestauranteUdi',
    port:5432
});
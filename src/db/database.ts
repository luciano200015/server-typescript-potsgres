import { Pool } from "pg";

export const pool=new Pool({
    //connectionString:'postgresql://postgres:1A3eb32GfFFDE3A2Dedfad116B5*5d-c@roundhouse.proxy.rlwy.net:19791/railway'
    user:'postgres',
    host:'localhost',
    password:'1010',
    database:'RestauranteUdi',
    //port:19791
});
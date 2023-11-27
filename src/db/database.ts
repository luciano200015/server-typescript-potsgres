import { Pool } from "pg";

export const pool=new Pool({
    connectionString:'postgresql://postgres:1A3eb32GfFFDE3A2Dedfad116B5*5d-c@roundhouse.proxy.rlwy.net:19791/railway'
    /*user:'postgres',
    host:'roundhouse.proxy.rlwy.net',
    password:'1A3eb32GfFFDE3A2Dedfad116B5*5d-c',
    database:'RestauranteUdi',
    port:19791*/
});
import createConnectionPool, {sql,ConnectionPoolConfig} from '@databases/pg';
const PG_DATABASE_URL: string =  process.env.PG_DATABASE_URL || ''
export {sql};

const db = createConnectionPool(PG_DATABASE_URL);

export default db;
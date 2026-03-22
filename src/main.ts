import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './db/schema';


const pgsql = neon(process.env.DATABASE_URL as string);
const db = drizzle(pgsql, { schema, logger: true });

async function main() {

    const users = await db.query.UserTable.findMany({
        columns: { role: false }, // if you don'r specify any column, then it will return every field. but now it will return everything except for the role
        // orderBy: desc(UserTable.age)     #or you can do this
        // orderBy: (table, {asc}) => asc(table.age),
        where: (table, funcs) => funcs.between(table.age, 20, 24)
    })

    console.log(users);
    
}

main()
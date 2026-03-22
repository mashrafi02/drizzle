import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './db/schema';
import { UserTable } from './db/schema';
import { sql } from 'drizzle-orm';


const pgsql = neon(process.env.DATABASE_URL as string);
const db = drizzle(pgsql, { schema, logger: true });

async function main() {
    const users = await db.query.UserTable.findMany({
        columns: { role: false }, // if you don'r specify any column, then it will return every field. but now it will return everything except for the role
        extras: {
            lowerCaseName: sql<string>`lower(${UserTable.name})`.as("lowerCaseName") // for writing raw sql queries
        },
        limit: 1, // how may results you want
        offset: 1, // how many you want to skip from the start
    })

    console.log(users);
    
}

main()
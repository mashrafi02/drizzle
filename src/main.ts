import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './db/schema';
import { UserTable, UserPreferencesTable } from './db/schema';
import { sql } from 'drizzle-orm';


const pgsql = neon(process.env.DATABASE_URL as string);
const db = drizzle(pgsql, { schema, logger: true });

async function main() {

    const users = await db.query.UserTable.findMany({
        columns: { role: false }, // if you don'r specify any column, then it will return every field. but now it will return everything except for the role
        with: {
            preferences: {
                columns: {
                    emailUpdates : true
                }
            },
            posts: true
        }
    })

    console.log(users);
    
}

main()
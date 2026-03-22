import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './db/schema';
import { count, eq, gt } from 'drizzle-orm';
import { UserTable } from './db/schema'


const pgsql = neon(process.env.DATABASE_URL as string);
const db = drizzle(pgsql, { schema, logger: true });

async function main() {

    await db.update(UserTable)
            .set({ age: 30 })
            .where(eq(UserTable.age, 24))
    // console.log(users);
}

main()
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './db/schema';
import { eq } from 'drizzle-orm';
import { UserTable, UserPreferencesTable } from './db/schema'


const pgsql = neon(process.env.DATABASE_URL as string);
const db = drizzle(pgsql, { schema, logger: true });

async function main() {

    await db.delete(UserPreferencesTable)
        .where(eq(UserPreferencesTable.userId, "32d876bb-f50e-4faa-80c6-40604b85e897"));

    await db.delete(UserTable)
        .where(eq(UserTable.id, "32d876bb-f50e-4faa-80c6-40604b85e897"));
}

main()
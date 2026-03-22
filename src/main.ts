import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './db/schema';
import { count, gt } from 'drizzle-orm';
import { UserTable } from './db/schema'


const pgsql = neon(process.env.DATABASE_URL as string);
const db = drizzle(pgsql, { schema, logger: true });

async function main() {

    // const users = await db.select({ id: UserTable.id, email: UserTable.email, emailUpdates: UserPreferencesTable.emailUpdates })
    //                       .from(UserTable)
    //                     //   .where(eq(UserTable.age, 24))
    //                       .leftJoin(UserPreferencesTable, eq(UserPreferencesTable.userId, UserTable.id))

    const users = await db.select({ name: UserTable.name, count: count(UserTable.name) })
                          .from(UserTable)
                          .groupBy(UserTable.name)
                          .having(columns => gt(columns.count, 1))
    console.log(users);
}

main()
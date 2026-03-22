import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './db/schema';
import { UserTable } from './db/schema';


const pgsql = neon(process.env.DATABASE_URL as string);
const db = drizzle(pgsql, { schema, logger: true });

async function main() {
    const user = await db.insert(UserTable)
                    .values([   // you can add multiple values with insert method
                        {
                            name: "Mashrafi",
                            age: 25,
                            email: 'mash@mail.com'
                        },
                        {
                            name: "Deku",
                            age: 24,
                            email: "deku@hero.com"
                        }
                    ])
                    .returning({    // return what you want and can even change the property name
                        id: UserTable.id,
                        emailAdd: UserTable.email,
                    })
                    .onConflictDoUpdate({   // do something when some thing conflicts
                        target: UserTable.email,
                        set: { name: "Updated name"}
                    })

      console.log(user);
}

main()
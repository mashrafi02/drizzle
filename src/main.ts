import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './db/schema';


const pgsql = neon(process.env.DATABASE_URL as string);
const db = drizzle(pgsql, { schema, logger: true });

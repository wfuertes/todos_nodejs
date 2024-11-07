import 'dotenv/config';
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";

const db: MySql2Database<Record<string, never>> = drizzle({ connection: { uri: process.env.DATABASE_URL }});

export { db };
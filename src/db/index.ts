import { drizzle } from "drizzle-orm/node-sqlite";
import * as schema from "./schema";

export const db = drizzle("sqlite.db", { schema });

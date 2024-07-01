import { defineCollection, z } from "astro:content";

export const TypeEnum = z.enum([
  "base",
  "database",
  "storage",
  "queue",
  "webserver",
]);

export const ServiceName = z.enum([
  "base",
  "SQLite",
  "Postgres",
  "Caddy",

  "Apache",
  "Hetzner",
]);

const baseSchema = z.object({
  type: z.literal("base").optional().default("base"),
  name: ServiceName.optional().default("base"),
  shortTitle: z.string(),
  order: z.number().optional().default(Infinity),
  title: z.string(),
  description: z.string(),
  lastModifiedAt: z.coerce.date().optional(),
  publishedAt: z.coerce.date(),
});

const SQLite = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    type: z.literal(TypeEnum.enum.database).default(TypeEnum.enum.database),
    name: z.literal("SQLite").default("SQLite"),
  }),
});

const Hetzner = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    type: z.literal(TypeEnum.enum.webserver).default(TypeEnum.enum.webserver),
    name: z.literal("satellite").default("satellite"),
  }),
});

export const collections = {
  sqlite: SQLite,
  // postgres: Postgres,
  // caddy: Caddy,
  hetzner: Hetzner,
  // redis: Redis,
};

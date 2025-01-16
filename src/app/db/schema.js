const { pgTable, timestamp, serial, integer } = require("drizzle-orm/pg-core");

const apiInventory = pgTable("api_inventory", {
  id: serial("id").primaryKey(),
  count: integer("count").default(0).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  last_modified: timestamp("last_modified").defaultNow().notNull(),
});

module.exports = { categories };

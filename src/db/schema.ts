
import { boolean, index, integer, pgEnum, pgTable, primaryKey, real, timestamp, uuid, varchar } from "drizzle-orm/pg-core"


export const UserRole = pgEnum("userRole", ["ADMIN", "GUEST"]);
export const UserTable = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length:255 }).notNull().unique(),
    role: UserRole("userRole").default("GUEST").notNull()
}, table => [ // whatever you do in this extraConfig callback block, it will be accross the whole table.
        index("emailIndex").on(table.email), // setting a index on the email field to query this table a little more faster
        // emailIndex: uniqueIndex("emailIndex").on(table.email),    you could also do it like this. in this way you would'nt have to make email field unique in the actual table
        // uniqueNameAndAge: unique("uniqueNameAndAge").on(table.name, table.age)     now in this table every name and age must be unique.
])



// one to one relationship --- one user can have one preference
export const UserPreferencesTable = pgTable("userPreferences", {
    id: uuid("id").primaryKey().defaultRandom(),
    emailUpdates: boolean("emailUpdates").notNull().default(false),
    userId: uuid("userId").references(() => UserTable.id, {onDelete: "no action"}).notNull().unique()
})


// one to many relationship --- one user can have multiple posts
export const PostTable = pgTable("post", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    averageRating: real("averageRating").notNull().default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    authorId: uuid("authorId").references(() => UserTable.id ).notNull()
})


// many to many relationship --- one post can have multiple category and one categories can have multiple posts
export const CategoryTable = pgTable("category", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
})


export const PostCategoryTable = pgTable("postCategory", {
    postId: uuid("postId").references(() => PostTable.id ).notNull(),
    categoryId: uuid("categoryId").references(() => CategoryTable.id ).notNull(),
}, table => [
    primaryKey({ columns: [table.postId, table.categoryId]}) // you could also just add a id field with primeryKey method in the actucal table. But since the combo of postId and category id are always going to be unique, we can just use them to make a primery key for the table in the extraConfig callback
])


// you do some other interesting things like
export const UserTestTable = pgTable("user_test", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    // age: integer("age").notNull().array(), for array of numers instead of just a number
    // age: integer("age").notNull().$type<12 | 24>(), for overwriting a fields default type 
    // age: integer("age").notNull().$default(() => Math.random()), for running a function when the database runs each time 
    email: varchar("email", { length:255 }).notNull().unique(),
    role: UserRole("userRole").default("GUEST").notNull()
})
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    todos: defineTable({
        text: v.string(),
        isCompleted: v.boolean(),
        userId: v.optional(v.string()),
    }).index("by_user_id", ["userId"]),

});


import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return []; // Return empty list if not logged in
        }
        const userId = identity.subject;

        // Filter by userId using the index we created
        const todos = await ctx.db
            .query("todos")
            .withIndex("by_user_id", (q) => q.eq("userId", userId))
            .order("desc")
            .collect();

        return todos;
    },
});

export const addTodo = mutation({
    args: {
        text: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");
        const userId = identity.subject;

        const todoId = await ctx.db.insert("todos", {
            text: args.text,
            isCompleted: false,
            userId: userId,
        })
        return todoId;
    },
});

export const toggleTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");
        const userId = identity.subject;

        const todo = await ctx.db.get(args.id);
        if (!todo) {
            throw new Error("Todo not found");
        }

        // Ensure user owns this todo
        if (todo.userId !== userId) {
            throw new Error("Unauthorized");
        }

        await ctx.db.patch(args.id, {
            isCompleted: !todo.isCompleted,
        })
    }
})

export const deleteTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");
        const userId = identity.subject;

        const todo = await ctx.db.get(args.id);
        if (!todo || todo.userId !== userId) {
            // Silently fail or throw error if not found/unauthorized
            return;
        }

        await ctx.db.delete(args.id);
    }
})

export const updateTodo = mutation({
    args: {
        id: v.id("todos"),
        text: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");
        const userId = identity.subject;

        const todo = await ctx.db.get(args.id);
        if (!todo || todo.userId !== userId) {
            throw new Error("Unauthorized");
        }

        await ctx.db.patch(args.id, {
            text: args.text,
        })
    }
})

export const clearAllTodos = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");
        const userId = identity.subject;

        const todos = await ctx.db
            .query("todos")
            .withIndex("by_user_id", (q) => q.eq("userId", userId))
            .collect();

        for (const todo of todos) {
            await ctx.db.delete(todo._id);
        }
        return { deletedCount: todos.length, message: "All todos deleted" }
    }
})

export const clearCompletedTodos = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");
        const userId = identity.subject;

        const todos = await ctx.db
            .query("todos")
            .withIndex("by_user_id", (q) => q.eq("userId", userId))
            .filter((q) => q.eq(q.field("isCompleted"), true))
            .collect();

        for (const todo of todos) {
            await ctx.db.delete(todo._id);
        }
        return { deletedCount: todos.length, message: "All completed todos deleted" }
    }
})
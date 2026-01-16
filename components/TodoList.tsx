import { createHomeStyles } from "@/assets/styles/home.styles";
import { Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import React from "react";
import { FlatList } from "react-native";
import EmptyTodos from "./EmptyTodos";
import TodoItem from "./TodoItem";

interface Todo {
    _id: Id<"todos">;
    _creationTime: number;
    text: string;
    isCompleted: boolean;
}

interface TodoListProps {
    todos: Todo[] | undefined;
    onToggle: (id: Id<"todos">) => void;
    onDelete: (id: Id<"todos">) => void;
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);

    return (
        <FlatList
            data={todos}
            renderItem={({ item }) => <TodoItem item={item} onToggle={onToggle} onDelete={onDelete} />}
            keyExtractor={item => item._id}
            style={homeStyles.todoList}
            contentContainerStyle={homeStyles.todoListContent}
            ListEmptyComponent={<EmptyTodos />}
        />
    );
};

export default TodoList;

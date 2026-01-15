import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyTodos from "@/components/EmptyTodos";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  // updated function name
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const isLoading = todos === undefined;
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to toggle todo");
    }
  }

  const handleDeleteTodo = async (id: Id<"todos">) => {
    try {
      await deleteTodo({ id });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to delete todo");
    }
  }

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={({ item }) => <TodoItem item={item} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />}
          keyExtractor={item => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyTodos />}
        // showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

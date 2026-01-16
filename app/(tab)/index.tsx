import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { Alert, FlatList, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const todos = useQuery(api.todos.getTodos);
  // updated function name
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const activeTodos = todos?.filter(t => !t.isCompleted);
  const completedTodos = todos?.filter(t => t.isCompleted);

  const tabs = [
    { key: 'All', title: 'All', data: todos },
    { key: 'Active', title: 'Active', data: activeTodos },
    { key: 'Completed', title: 'Completed', data: completedTodos },
  ];

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

  const handleTabPress = (index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />

        <View style={homeStyles.tabContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.key}
              style={[homeStyles.tabButton, activeIndex === index && homeStyles.tabButtonActive]}
              onPress={() => handleTabPress(index)}
            >
              <Text style={[homeStyles.tabText, activeIndex === index && homeStyles.tabTextActive]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          ref={flatListRef}
          data={tabs}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.key}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={[homeStyles.pageContainer, { width }]}>
              <TodoList
                todos={item.data}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

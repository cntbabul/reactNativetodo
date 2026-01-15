import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";


type TodoItemProps = {
    item: Doc<"todos">;
    onToggle: (id: Id<"todos">) => void;
    onDelete: (id: Id<"todos">) => void;
};

export default function TodoItem({ item, onToggle, onDelete }: TodoItemProps) {
    const { colors } = useTheme();
    const styles = createHomeStyles(colors);
    const homeStyles = createHomeStyles(colors);
    const deleteTodo = useMutation(api.todos.deleteTodo);
    const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
    const [editText, setEditText] = useState<string>("");
    const updateTodo = useMutation(api.todos.updateTodo);
    const isEditing = editingId === item._id;

    const handleDeleteTodo = async (id: Id<"todos">) => {
        Alert.alert(
            "Delete Todo",
            "Are you sure you want to delete this todo?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteTodo({ id })
                }
            ]
        )
    }
    const handleEditTodo = async (todo: Doc<"todos">) => {
        console.log("Editing todo:", todo._id);
        setEditingId(todo._id);
        setEditText(todo.text);
    }
    const handleSaveEdit = async () => {
        if (editingId) {
            try {
                await updateTodo({ id: editingId, text: editText.trim() });
                Alert.alert("Success", "Todo updated successfully");
                setEditingId(null);
                setEditText("");
            } catch (error) {
                console.log(error, "failed to edit todo");
                Alert.alert("Error", "Failed to update todo");
            }
        }
    }

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditText("");
    }





    return (
        <View style={styles.todoItemWrapper}>
            <LinearGradient
                colors={colors.gradients.surface}
                style={styles.todoItem}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <TouchableOpacity
                    style={styles.checkbox}
                    activeOpacity={0.7}
                    onPress={() => onToggle(item._id)}
                >
                    <LinearGradient
                        colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
                        style={[styles.checkboxInner, { borderColor: item.isCompleted ? "transparent" : colors.border }]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        {item.isCompleted && (
                            <Ionicons
                                name="checkmark"
                                size={18}
                                color="white"
                            />
                        )}
                    </LinearGradient>
                </TouchableOpacity>
                {editingId ? (
                    <View style={homeStyles.editContainer}>
                        <TextInput
                            style={homeStyles.editInput}
                            value={editText}
                            onChangeText={setEditText}
                            autoFocus
                            multiline
                            placeholder="Edit your todo..."
                            placeholderTextColor={colors.textMuted}
                        />
                        <View style={homeStyles.editButtons}>
                            <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                                <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                                    <Ionicons name="checkmark" size={16} color="#fff" />
                                    <Text style={homeStyles.editButtonText}>Save</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                                <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                                    <Ionicons name="close" size={16} color="#fff" />
                                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (<View style={homeStyles.todoTextContainer}>
                    <Text style={[styles.todoText, item.isCompleted && { textDecorationLine: "line-through", color: colors.textMuted, opacity: 0.6 }]}>{item.text}</Text>
                    <View style={homeStyles.todoActions}>
                        <TouchableOpacity
                            onPress={() => handleEditTodo(item)}
                            activeOpacity={0.7}>
                            <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                                <Ionicons
                                    name="pencil"
                                    size={21}
                                    color="white"
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleDeleteTodo(item._id)}
                            activeOpacity={0.7}>
                            <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                                <Ionicons
                                    name="trash"
                                    size={21}
                                    color="white"
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                )}
            </LinearGradient >

        </View >
    );
}
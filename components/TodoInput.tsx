import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, TextInput, TouchableOpacity, View } from 'react-native';


const TodoInput = () => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);
    const [newTodo, setNewTodo] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const addTodo = useMutation(api.todos.addTodo);
    const handleAddTodo = async () => {
        if (newTodo.trim() && !isAdding) {
            setIsAdding(true);
            try {
                await addTodo({ text: newTodo.trim() })
                setNewTodo('')
            } catch (error) {
                console.log(error, "error adding todo")
                Alert.alert('Error', 'Failed to add todo')
            } finally {
                setIsAdding(false);
            }
        }
    };

    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput
                    style={homeStyles.input}
                    placeholder="Add a new todo"
                    value={newTodo}
                    onChangeText={setNewTodo}
                    onSubmitEditing={handleAddTodo}
                    multiline
                    placeholderTextColor={colors.textMuted}
                />
                <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8} disabled={!newTodo.trim() || isAdding} >
                    <LinearGradient
                        colors={newTodo.trim() && !isAdding ? colors.gradients.primary : colors.gradients.muted}
                        style={[homeStyles.addButton, (!newTodo.trim() || isAdding) && homeStyles.addButtonDisabled]}
                    >
                        {isAdding ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Ionicons name="add" size={24} color="white" />
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoInput
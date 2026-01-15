import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

const EmptyTodos = () => {
    const { colors } = useTheme();
    const styles = createHomeStyles(colors);

    return (
        <View style={styles.emptyContainer}>
            <LinearGradient
                colors={colors.gradients.surface}
                style={styles.emptyIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Ionicons
                    name="list"
                    size={48}
                    color={colors.primary}
                />
            </LinearGradient>
            <Text style={styles.emptyText}>No Tasks Yet</Text>
            <Text style={styles.emptySubtext}>
                You're all caught up! Add a new task to get started with your day.
            </Text>
        </View>
    )
}

export default EmptyTodos
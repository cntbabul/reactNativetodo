import { createSettingsStyles } from '@/assets/styles/settings.styles'
import { api } from '@/convex/_generated/api'
import useTheme from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from 'convex/react'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'



const ProgressStatus = () => {
    const { colors } = useTheme();
    const settingStyles = createSettingsStyles(colors);
    const todos = useQuery(api.todos.getTodos);
    const totalTodos = todos ? todos.length : 0;
    const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length : 0;
    const progress = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
    const activeTodos = totalTodos - completedTodos;

    return (
        <LinearGradient colors={colors.gradients.surface} style={settingStyles.section}>
            <Text style={settingStyles.sectionTitle}>ProgressStatus</Text>
            <View style={settingStyles.statsContainer}>
                {/* total  */}
                <LinearGradient colors={colors.gradients.background} style={[settingStyles.statCard, { borderLeftColor: colors.primary }]}>
                    <View style={settingStyles.statIconContainer}>
                        <LinearGradient colors={colors.gradients.primary} style={settingStyles.statIcon}>
                            <Ionicons name="list-outline" size={24} color="white" />
                        </LinearGradient>
                    </View>
                    <View >
                        <Text style={settingStyles.statNumber}>{totalTodos}</Text>
                        <Text style={settingStyles.statLabel}>Total Todos</Text>
                    </View>
                </LinearGradient>
                {/* completed  */}
                <LinearGradient colors={colors.gradients.background} style={[settingStyles.statCard, { borderLeftColor: colors.success }]}>
                    <View style={settingStyles.statIconContainer}>
                        <LinearGradient colors={colors.gradients.primary} style={settingStyles.statIcon}>
                            <Ionicons name="checkmark-outline" size={24} color="white" />
                        </LinearGradient>
                    </View>
                    <View >
                        <Text style={settingStyles.statNumber}>{completedTodos}</Text>
                        <Text style={settingStyles.statLabel}>Completed Todos</Text>
                    </View>
                    {/* active  */}
                </LinearGradient>
                <LinearGradient colors={colors.gradients.background} style={[settingStyles.statCard, { borderLeftColor: colors.success }]}>
                    <View style={settingStyles.statIconContainer}>
                        <LinearGradient colors={colors.gradients.primary} style={settingStyles.statIcon}>
                            <Ionicons name="time-outline" size={24} color="white" />
                        </LinearGradient>
                    </View>
                    <View >
                        <Text style={settingStyles.statNumber}>{activeTodos}</Text>
                        <Text style={settingStyles.statLabel}>Active Todos</Text>
                    </View>
                </LinearGradient>
            </View>



        </LinearGradient>
    )
}

export default ProgressStatus
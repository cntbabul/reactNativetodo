import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
    const { colors } = useTheme();
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarStyle: {
                backgroundColor: colors.bg,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                height: 100,
                paddingBottom: 30,
                paddingTop: 10
            },
            tabBarLabelStyle: {
                fontSize: 16,
                fontWeight: "400"
            },
            headerShown: false,
        }}>
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <Ionicons name='person-outline' size={size} color={color} />
                }} />
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Todos',
                    tabBarIcon: ({ color, size }) => <Ionicons name='bookmarks-outline' size={size} color={color} />
                }} />
            <Tabs.Screen
                name='settings'
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => <Ionicons name='settings-outline' size={size} color={color} />

                }} />
        </Tabs >
    )
}

export default TabsLayout
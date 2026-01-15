import { createSettingsStyles } from "@/assets/styles/settings.styles";
import DangerZone from "@/components/DangerZone";
import Preferences from "@/components/Preferences";
import ProgressStatus from "@/components/ProgressStatus";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const SettingScreen = () => {

    const { colors, isDarkMode, toggleDarkMode } = useTheme();
    const settingStyles = createSettingsStyles(colors);



    return (
        <LinearGradient colors={colors.gradients.background} style={settingStyles.container}>
            <SafeAreaView style={settingStyles.safeArea}>
                {/* header  */}
                <View style={settingStyles.header}>
                    <View style={settingStyles.titleContainer}>
                        <LinearGradient colors={colors.gradients.primary} style={settingStyles.iconContainer}>
                            <Ionicons name="settings-outline" size={28} color="white" />
                        </LinearGradient>
                        <Text style={settingStyles.title}>Settings</Text>
                    </View>
                </View>
                {/* body  */}
                <ScrollView style={settingStyles.scrollView} contentContainerStyle={settingStyles.content} showsVerticalScrollIndicator={false}>
                    <ProgressStatus />
                    <Preferences />
                    <DangerZone />
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )


}

export default SettingScreen;
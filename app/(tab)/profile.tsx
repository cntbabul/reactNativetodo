import { createSettingsStyles } from "@/assets/styles/settings.styles";
import UserProfile from "@/components/UserProfile";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
    const { colors } = useTheme();
    const settingStyles = createSettingsStyles(colors);

    return (
        <LinearGradient colors={colors.gradients.background} style={settingStyles.container}>
            <SafeAreaView style={settingStyles.safeArea}>
                {/* header  */}
                <View style={settingStyles.header}>
                    <View style={settingStyles.titleContainer}>
                        <LinearGradient colors={colors.gradients.primary} style={settingStyles.iconContainer}>
                            <Ionicons name="person-outline" size={28} color="white" />
                        </LinearGradient>
                        <Text style={settingStyles.title}>Profile</Text>
                    </View>
                </View>
                {/* body  */}
                <ScrollView style={settingStyles.scrollView} contentContainerStyle={settingStyles.content} showsVerticalScrollIndicator={false}>
                    <UserProfile />
                    {/* Placeholder for future profile-specific settings or stats */}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

export default ProfileScreen;

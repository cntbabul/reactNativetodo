import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "@/hooks/useTheme";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

const UserProfile = () => {
    const { colors } = useTheme();
    const settingsStyles = createSettingsStyles(colors);
    const { user } = useUser();
    const { signOut } = useAuth();

    const handleSignOut = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: async () => {
                        await signOut();
                    }
                }
            ]
        )
    }

    if (!user) return null;

    return (
        <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <Image
                    source={{ uri: user.imageUrl }}
                    style={{ width: 60, height: 60, borderRadius: 30, marginRight: 16 }}
                />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>
                        {user.fullName || "User"}
                    </Text>
                    <Text style={{ fontSize: 14, color: colors.textMuted }}>
                        {user.primaryEmailAddress?.emailAddress}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={[settingsStyles.actionButton, { borderBottomWidth: 0 }]}
                onPress={handleSignOut}
                activeOpacity={0.7}
            >
                <View style={settingsStyles.actionLeft}>
                    <LinearGradient colors={colors.gradients.danger} style={settingsStyles.actionIcon}>
                        <Ionicons name="log-out-outline" size={18} color="#ffffff" />
                    </LinearGradient>
                    <Text style={settingsStyles.actionTextDanger}>Sign Out</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default UserProfile;

import useTheme from "@/hooks/useTheme";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
    const { colors } = useTheme();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const handleGoogleLogin = React.useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startOAuthFlow();
            if (createdSessionId && setActive) {
                setActive({ session: createdSessionId });
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, [startOAuthFlow]);

    return (
        <LinearGradient colors={colors.gradients.background} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <LinearGradient colors={colors.gradients.primary} style={styles.iconContainer}>
                        <Ionicons name="checkbox" size={64} color="white" />
                    </LinearGradient>
                    <Text style={[styles.title, { color: colors.text }]}>Focus Flow</Text>
                    <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                        Organize your life, one todo at a time.
                    </Text>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.surface }]}
                        onPress={handleGoogleLogin}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="logo-google" size={24} color={colors.text} style={styles.buttonIcon} />
                        <Text style={[styles.buttonText, { color: colors.text }]}>Continue with Google</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        width: "100%",
        paddingHorizontal: 24,
        alignItems: "center",
        gap: 12,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontSize: 36,
        fontWeight: "800",
        letterSpacing: -1,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 48,
        paddingHorizontal: 32,
        lineHeight: 26,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingVertical: 18,
        borderRadius: 16,
        gap: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    buttonIcon: {
        marginRight: 4,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "700",
    },
});

export default LoginScreen;

import { Redirect } from "expo-router";

export default function OAuthNativeCallback() {
    // This route handles the OAuth redirect signal.
    // We simply redirect to the main app flow (Profile) once here.
    return <Redirect href="/(tab)" />;
}

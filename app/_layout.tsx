import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, ActivityIndicator } from "react-native";
import "react-native-reanimated";
import { QueryProvider } from "@/lib/QueryProvider";

export default function RootLayout() {
  const [loaded] = useFonts({
    '     Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
          'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
          'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
          'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
          'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
          'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
          'Poppins-LightItalic': require('../assets/fonts/Poppins-LightItalic.ttf'),
          'Poppins-MediumItalic': require('../assets/fonts/Poppins-MediumItalic.ttf'),
          'Poppins-BoldItalic': require('../assets/fonts/Poppins-BoldItalic.ttf'),
          'Poppins-SemiBoldItalic': require('../assets/fonts/Poppins-SemiBoldItalic.ttf'),
          'Poppins-ExtraBoldItalic': require('../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
          'Poppins-ThinItalic': require('../assets/fonts/Poppins-ThinItalic.ttf'),
          'Poppins-BlackItalic': require('../assets/fonts/Poppins-BlackItalic.ttf'),
  });

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0F0F23",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ marginTop: 10, color: "#FFFFFF", fontSize: 16 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <>

        <QueryProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#0F0F23" },
            }}
          >
            {/* Default index route */}
            <Stack.Screen name="index" options={{ headerShown: false }} />

            {/* Main app tabs */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth" />

            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="light" />
        </QueryProvider>

    </>
  );
}
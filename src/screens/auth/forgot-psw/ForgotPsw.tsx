import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";
import Svg, { Path } from "react-native-svg";

interface Avatar {
  id: number;
  src: string;
  top?: string;
  left?: string;
  bottom?: string;
  delay: number;
}

const AVATARS: Avatar[] = [
  {
    id: 1,
    src: "https://i.pravatar.cc/150?img=45",
    top: "15%",
    left: "8%",
    delay: 0,
  },
  {
    id: 2,
    src: "https://i.pravatar.cc/150?img=28",
    top: "12%",
    left: "75%",
    delay: 1000,
  },
  {
    id: 3,
    src: "https://i.pravatar.cc/150?img=67",
    top: "45%",
    left: "85%",
    delay: 2000,
  },
];

interface FloatingAvatarProps {
  avatar: Avatar;
}

const FloatingAvatar: React.FC<FloatingAvatarProps> = ({ avatar }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    const timeout = setTimeout(() => {
      animate();
    }, avatar.delay);

    return () => clearTimeout(timeout);
  }, [avatar.delay, translateY]);

  const position: any = {};
  if (avatar.top) position.top = avatar.top;
  if (avatar.bottom) position.bottom = avatar.bottom;
  if (avatar.left) position.left = avatar.left;

  return (
    <Animated.View
      style={[
        styles.avatarContainer,
        position,
        { transform: [{ translateY }] },
      ]}
    >
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: avatar.src }} style={styles.avatarImage} />
      </View>
    </Animated.View>
  );
};

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    router.push("/auth/ResetPsw");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Marketing Section with Avatars */}
        <View style={styles.marketingSection}>
          <View style={styles.marketingContent}>
            <Text style={styles.marketingTitle}>
              Reset Your{"\n"}Password
            </Text>
            <Text style={styles.marketingSubtitle}>
              Secure your account in just a few steps. Well help you regain access.
            </Text>
          </View>

          {/* SVG Connection Lines */}
          <Svg
            width="100%"
            height="100%"
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
            style={styles.svgPath}
          >
            <Path
              d="M 50,30 Q 200,80 350,40"
              fill="none"
              stroke="#16a34a"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity={0.4}
            />
            <Path
              d="M 60,140 Q 250,60 340,180"
              fill="none"
              stroke="#16a34a"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity={0.4}
            />
          </Svg>

          {/* Floating Avatars */}
          {AVATARS.map((avatar) => (
            <FloatingAvatar key={avatar.id} avatar={avatar} />
          ))}

          {/* Background Glow */}
          <View style={styles.glow} />
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
        <View>

     
<View style={styles.header}>
  <Text style={styles.title}>Forgot password?</Text>
  <Text style={styles.subtitle}>
    No worries, well send you reset instructions to your email.
  </Text>
</View>

{/* Email Input */}
<View style={styles.inputGroup}>
  <Text style={styles.label}>Email address</Text>
  <TextInput
    style={styles.input}
    placeholder="name@company.com"
    placeholderTextColor="#9CA3AF"
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
    autoCapitalize="none"
    autoComplete="email"
  />
</View>

{/* Submit Button */}
<TouchableOpacity style={styles.button} onPress={handleSubmit}>
  <Text style={styles.buttonText}>Reset password</Text>
</TouchableOpacity>

{/* Back to Login */}
<View style={styles.footer}>
  <Link href="/auth/Login" asChild>
    <TouchableOpacity style={styles.backButton}>

      {/* <Text style={styles.backText}>Back to log in</Text> */}
    </TouchableOpacity>
  </Link>
</View>
</View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  marketingSection: {
    backgroundColor: COLORS.pri,
    paddingHorizontal: 24,
    paddingVertical: 48,
    minHeight: 220,
    position: "relative",
    overflow: "hidden",
  },
  marketingContent: {
    flex: 1,
    justifyContent: "center",
    zIndex: 10,
  },
  marketingTitle: {
    paddingTop: 20,
    fontSize: 28,
    color: "#fff",
    marginBottom: 12,
    lineHeight: 36,
    fontFamily: FONTS.medium,
  },
  marketingSubtitle: {
    fontSize: 15,
    color: "rgba(209, 250, 229, 0.9)",
    lineHeight: 22,
    fontFamily: FONTS.light,
    maxWidth: 280,
  },
  svgPath: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 5,
  },
  avatarContainer: {
    position: "absolute",
    zIndex: 15,
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    padding: 3,
    backgroundColor: "rgba(22, 101, 52, 0.5)",
    borderWidth: 1.5,
    borderColor: "rgba(74, 222, 128, 0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: "#4ade80",
  },
  glow: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    backgroundColor: "#16a34a",
    borderRadius: 100,
    opacity: 0.15,
  },
  formSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.medium,
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    fontFamily: FONTS.light,
  },
  successIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successIcon: {
    fontSize: 32,
  },
  emailHighlight: {
    color: "#111827",
    fontFamily: FONTS.medium,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: COLORS.pri,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  resendSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  resendText: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: FONTS.light,
  },
  resendLink: {
    fontSize: 14,
    color: COLORS.pri,
    fontFamily: FONTS.medium,
  },
  footer: {
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 18,
    color: "#6B7280",
    marginRight: 8,
  },
  backText: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: FONTS.medium,
  },
});
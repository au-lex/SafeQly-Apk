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
  Pressable,
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
    src: "https://i.pravatar.cc/150?img=32",
    top: "15%",
    left: "8%",
    delay: 0,
  },
  {
    id: 2,
    src: "https://i.pravatar.cc/150?img=12",
    top: "12%",
    left: "75%",
    delay: 1000,
  },
  {
    id: 3,
    src: "https://i.pravatar.cc/150?img=59",
    top: "45%",
    left: "85%",
    delay: 2000,
  },
  // { id: 4, src: 'https://i.pravatar.cc/150?img=33', bottom: '8%', left: '70%', delay: 1500 },
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

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.push("/(tabs)/Home");
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
              Your Money,{"\n"}Protected Until{"\n"}Delivery
            </Text>
            <Text style={styles.marketingSubtitle}>
              Escrow made simple. Pay with confidence, release funds when
              satisfied.
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
          <View style={styles.header}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Enter your details to access your SafeQly account.
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

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Password</Text>
              <Link href="/auth/ForgotPsw" asChild>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              </Link>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIconText}>
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me */}
          <Pressable
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            >
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Remember me for 30 days</Text>
          </Pressable>

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Dont have an account? </Text>
            <Link href="/" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Sign up</Text>
              </TouchableOpacity>
            </Link>
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
    // paddingTop: 60,
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

  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    fontFamily: FONTS.light,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: "#374151",
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#fff",
    height: 48,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111827",
  },
  eyeIcon: {
    padding: 12,
  },
  eyeIconText: {
    fontSize: 20,
  },
  forgotPassword: {
    fontSize: 13,
    color: COLORS.pri,
    fontFamily: FONTS.medium,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: COLORS.pri,
    borderColor: COLORS.pri,
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#111827",
    fontFamily: FONTS.light,
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  footerLink: {
    fontSize: 14,
    color: "#053014",
    fontFamily: FONTS.medium,
  },
});

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";
import SafeLayout from "@/safeLayout/SafeLayout";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
    top: "20%",
    left: "10%",
    delay: 0,
  },
  {
    id: 2,
    src: "https://i.pravatar.cc/150?img=12",
    top: "55%",
    left: "35%",
    delay: 1000,
  },
  {
    id: 3,
    src: "https://i.pravatar.cc/150?img=59",
    top: "45%",
    left: "70%",
    delay: 2000,
  },
  {
    id: 4,
    src: "https://i.pravatar.cc/150?img=33",
    top: "10%",
    left: "55%",
    delay: 1500,
  },
  // { id: 5, src: 'https://i.pravatar.cc/150?img=5', bottom: '-5%', left: '15%', delay: 500 },
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

const OnboardingSide: React.FC = () => {
  const router = useRouter();

  return (
    <SafeLayout>
      <View style={styles.container}>
        {/* Brand Logo */}

        {/* Decorative Dots Grid */}
        <View style={styles.dotsContainer}>
          {[...Array(16)].map((_, i) => (
            <View key={i} style={styles.dot} />
          ))}
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            Secure Escrow{"\n"}Payments for Everyone
          </Text>
          <Text style={styles.subtitle}>
            SafeQly protects your funds until the job is done. Simple,
            transparent, and secure.
          </Text>
        </View>

        {/* Get Started Button - Fixed at Bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => router.push("/auth/Login")}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Section with Avatars and SVG */}
        <View style={styles.bottomSection}>
          {/* SVG Path */}
          <Svg
            width="100%"
            height="100%"
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            style={styles.svgPath}
          >
            <Path
              d="M -50,150 Q 100,50 250,200 T 500,250"
              fill="none"
              stroke="#166534"
              strokeWidth="2"
              strokeDasharray="6 6"
              opacity={0.6}
            />
          </Svg>

          {/* Floating Avatars */}
          {AVATARS.map((avatar) => (
            <FloatingAvatar key={avatar.id} avatar={avatar} />
          ))}
        </View>
      </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pri,
    position: "relative",
    overflow: "hidden",
    minHeight: 400,
  },

  dotsContainer: {
    position: "absolute",
    top: 80,
    left: 32,
    flexDirection: "row",
    flexWrap: "wrap",
    width: 100,
    opacity: 0.1,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4ade80",
    marginRight: 8,
    marginBottom: 8,
  },
  contentContainer: {
    position: "relative",
    zIndex: 10,
    paddingHorizontal: 32,
    paddingVertical: 64,
    paddingTop: 120,
  },
  title: {
    fontSize: 32,

    color: "#fff",
    marginBottom: 24,
    lineHeight: 40,
    fontFamily: FONTS.semibold,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(209, 250, 229, 0.8)",
    lineHeight: 28,
    maxWidth: 400,
    fontFamily: FONTS.light,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 32,
    right: 32,
    zIndex: 30,
  },
  getStartedButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  getStartedButtonText: {
    color: COLORS.pri,
    fontSize: 16,
    fontFamily: FONTS.semibold,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60%",
    pointerEvents: "none",
  },
  svgPath: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  avatarContainer: {
    position: "absolute",
  },
  avatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    padding: 4,
    backgroundColor: "rgba(22, 101, 52, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#4ade80",
  },
});

export default OnboardingSide;

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,

} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DashboardHeader from "./DashHeader";
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";
import { useRouter } from "expo-router";

// === MOCK DATA ===
interface Transaction {
  id: string;
  fullName: string;
  phoneNumber: string;
  amount: number;
  dateTime: string;
  status: "completed" | "pending" | "failed" | "active";
  direction: "in" | "out";
  image?: string;
}

interface RecentUser {
  id: string;
  name: string;
  image: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);

  const transactions: Transaction[] = [
    {
      id: "1",
      fullName: "Michael Johnson",
      phoneNumber: "+234 801 234 5678",
      amount: 25.0,
      dateTime: "Oct 24, 2025 • 07:15 AM",
      status: "pending",
      direction: "out",
      image: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: "2",
      fullName: "Sarah Connor",
      phoneNumber: "+234 812 999 8888",
      amount: 89.0,
      dateTime: "Oct 23, 2025 • 02:30 PM",
      status: "completed",
      direction: "in",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: "3",
      fullName: "David Smith",
      phoneNumber: "+234 703 555 1212",
      amount: 2000.0,
      dateTime: "Oct 22, 2025 • 10:00 AM",
      status: "completed",
      direction: "in",
      image: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const recentUsers: RecentUser[] = [
    { id: "u1", name: "Michael", image: "https://i.pravatar.cc/150?img=60" },

    { id: "u2", name: "Sarah", image: "https://i.pravatar.cc/150?img=44" },

    { id: "u3", name: "David", image: "https://i.pravatar.cc/150?img=12" },

    { id: "u4", name: "Jessica", image: "https://i.pravatar.cc/150?img=5" },

    { id: "u5", name: "Daniel", image: "https://i.pravatar.cc/150?img=33" },

    { id: "add", name: "Add New", image: "" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#053014";
      case "pending":
        return "#F59E0B";
      case "failed":
        return "#EF4444";
      case "active":
        return "#3B82F6";
      default:
        return "#6B7280";
    }
  };

  return (
    <View style={styles.container}>
      {/* Transparent Status Bar to let Gradient show through */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        {/* === HERO SECTION === */}
        <LinearGradient
          colors={[COLORS.pri, "#042f2e", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          {/* Header Component */}
          <DashboardHeader />

          {/* Wallet Content */}
          <View style={styles.walletContainer}>
            {/* Top Row: Verified Badge & Tag */}
            <View style={styles.walletHeaderRow}>
              <View style={styles.verifiedBadge}>
                <MaterialCommunityIcons
                  name="shield-check"
                  size={14}
                  color="#4ADE80"
                />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>

              <View style={styles.glassTag}>
                <Text style={styles.tagText}>@Tag32Gb6</Text>
                <Ionicons
                  name="copy-outline"
                  size={12}
                  color="rgba(255,255,255,0.7)"
                />
              </View>
            </View>

            {/* Main Balance */}
            <View style={styles.balanceBlock}>
              <View style={styles.balanceLabelRow}>
                <Text style={styles.balanceLabel}>Total Balance</Text>
                <TouchableOpacity
                  onPress={() => setShowBalance(!showBalance)}
                  style={styles.eyeBtn}
                >
                  <Ionicons
                    name={showBalance ? "eye" : "eye-off"}
                    size={18}
                    color="rgba(255,255,255,0.6)"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.balanceText}>
                {showBalance ? "$22,060.00" : "$•••••••"}
              </Text>
            </View>

            {/* === RESTORED GLASS PILL ACTIONS === */}
            <View style={styles.glassActionRow}>
              <TouchableOpacity style={styles.glassBtn}>
                <Ionicons name="add" size={20} color="#FFF" />
                <Text style={styles.glassBtnText}>Add</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.glassBtn}>
                <Feather name="arrow-up-right" size={20} color="#FFF" />
                <Text style={styles.glassBtnText}>Send</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.glassBtn}
                onPress={() => router.push("/newEscrow/enterTag")}
              >
                <MaterialCommunityIcons
                  name="shield-check-outline"
                  size={20}
                  color="#FFF"
                />
                <Text style={styles.glassBtnText}>Escrow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* === WHITE BODY === */}
        <View style={styles.bodyContainer}>
          {/* Quick Transfer */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { paddingLeft:20 }]}>Quick Escrow</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentList}
            >
              <TouchableOpacity style={styles.recentUserItem}>
                <View style={styles.addUserCircle}>
                  <Ionicons name="add" size={24} color={COLORS.pri} />
                </View>

                <Text style={styles.recentUserName}>Add</Text>
              </TouchableOpacity>

              {recentUsers
                .filter((u) => u.id !== "add")
                .map((user) => (
                  <TouchableOpacity key={user.id} style={styles.recentUserItem}>
                    <Image
                      source={{ uri: user.image }}
                      style={styles.recentUserImage}
                    />

                    <Text style={styles.recentUserName} numberOfLines={1}>
                      {user.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          {/* Transactions List */}
          <View style={styles.transactionsContainer}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            {transactions.map((tx) => (
              <TouchableOpacity key={tx.id} style={styles.txItem}>
                <View style={styles.txLeft}>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={{ uri: tx.image }}
                      style={styles.avatarImage}
                    />
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: getStatusColor(tx.status) },
                      ]}
                    />
                  </View>
                  <View style={styles.txInfo}>
                    <Text style={styles.txName}>{tx.fullName}</Text>
                    <Text style={styles.txDate}>{tx.dateTime}</Text>
                  </View>
                </View>

                <View style={styles.txRight}>
                  <Text
                    style={[
                      styles.txAmount,
                      { color: tx.direction === "in" ? "#053014" : "#111827" },
                    ]}
                  >
                    {tx.direction === "in" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </Text>
                  <Text
                    style={[
                      styles.txStatus,
                      { color: getStatusColor(tx.status) },
                    ]}
                  >
                    {tx.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  // === HERO GRADIENT ===
  heroGradient: {
    paddingBottom: 30,

  },
  walletContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },

  // === WALLET TOP ROW ===
  walletHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(74, 222, 128, 0.15)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(74, 222, 128, 0.3)",
    gap: 6,
  },
  verifiedText: {
    color: "#4ADE80",
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  glassTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  tagText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontFamily: FONTS.medium,
  },

  // === BALANCE BLOCK ===
  balanceBlock: {
    marginBottom: 12,
  },
  balanceLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    // marginBottom: 8,
  },
  balanceLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 15,
    fontFamily: FONTS.light,
  },
  eyeBtn: {
    padding: 4,
  },
  balanceText: {
    color: "#FFF",
    fontSize: 42,
    fontFamily: FONTS.bold,
    letterSpacing: -0.5,
  },

  // === GLASS ACTION ROW (Restored) ===
  glassActionRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 100,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  glassBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
  },
  glassBtnText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: FONTS.semibold,
  },
  divider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 10,
  },

  // === BODY ===
  bodyContainer: {
    marginTop: 24,
    backgroundColor: COLORS.bg,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.semibold,
    color: COLORS.pri,
  
    marginBottom: 16,
  },
  recentList: {
    paddingHorizontal: 16,
  },

  recentUserItem: {
    alignItems: "center",

    marginRight: 16,

    width: 60,
  },

  recentUserImage: {
    width: 52,

    height: 52,

    borderRadius: 20,

    marginBottom: 6,
  },

  addUserCircle: {
    width: 52,

    height: 52,

    borderRadius: 20,

    marginBottom: 6,

    backgroundColor: "#F3F4F6",

    justifyContent: "center",

    alignItems: "center",
  },

  recentUserName: {
    fontSize: 11,

    color: "#4B5563",

    fontFamily: FONTS.medium,

    textAlign: "center",
  },

  // === TRANSACTIONS ===
  transactionsContainer: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    paddingHorizontal: 24,
    minHeight: 400,
    paddingBottom: 50,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    marginBottom: 10,

  },
  seeAllText: {
    color: COLORS.pri,
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
  txItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  txLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatarContainer: {
    position: "relative",
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: -2,
    right: -2,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  txInfo: {
    gap: 2,
  },
  txName: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: "#111827",
  },
  txDate: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: "#9CA3AF",
  },
  txRight: {
    alignItems: "flex-end",
    gap: 2,
  },
  txAmount: {
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  txStatus: {
    fontSize: 11,
    fontFamily: FONTS.medium,
    textTransform: "capitalize",
  },
});

export default Dashboard;

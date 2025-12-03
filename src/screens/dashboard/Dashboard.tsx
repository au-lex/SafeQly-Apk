import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import DashboardHeader from "./DashHeader";
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";

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
    {
      id: "4",
      fullName: "Jessica Williams",
      phoneNumber: "+234 909 000 1111",
      amount: 49.0,
      dateTime: "Oct 21, 2025 • 09:15 AM",
      status: "failed",
      direction: "out",
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: "5",
      fullName: "Daniel Brown",
      phoneNumber: "+234 802 333 4444",
      amount: 49.0,
      dateTime: "Oct 20, 2025 • 06:45 PM",
      status: "active",
      direction: "out",
      image: "https://i.pravatar.cc/150?img=5",
    },
  ];

  const recentUsers: RecentUser[] = [
    { id: "u1", name: "Michael", image: "https://i.pravatar.cc/150?img=60" },
    { id: "u2", name: "Sarah", image: "https://i.pravatar.cc/150?img=44" },
    { id: "u3", name: "David", image: "https://i.pravatar.cc/150?img=12" },
    { id: "u4", name: "Jessica", image: "https://i.pravatar.cc/150?img=5" },
    { id: "u5", name: "Daniel", image: "https://i.pravatar.cc/150?img=33" },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return { bg: "#D1FAE5", text: "#065F46" };
      case "pending":
        return { bg: "#FEF3C7", text: "#92400E" };
      case "failed":
        return { bg: "#FEE2E2", text: "#991B1B" };
      case "active":
        return { bg: "#DBEAFE", text: "#1E40AF" };
      default:
        return { bg: "#F3F4F6", text: "#374151" };
    }
  };

  return (
    <View style={styles.container}>
      <DashboardHeader />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
          </View>

          <View style={styles.balanceAmount}>
            <Text style={styles.balanceText}>
              {showBalance ? "$22,060.00" : "•••••••"}
            </Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              {showBalance ? (
                <Ionicons name="eye-outline" size={24} color="#9CA3AF" />
              ) : (
                <Ionicons name="eye-off-outline" size={24} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Ionicons name="add" size={20} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Fund Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Feather name="download" size={20} color="#053014" />
              <Text style={styles.secondaryButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>

          {/* Tag Section */}
          <View style={styles.tagSection}>
            <Text style={styles.tagText}>Tag32Gb6</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Copy Tag</Text>
              <Ionicons name="copy-outline" size={14} color="#053014" />
            </TouchableOpacity>
          </View>
        </View>

        {/* New Escrow Button */}
        <View style={styles.escrowButtonContainer}>
          <TouchableOpacity style={styles.escrowButton}>
            <Text style={styles.escrowButtonText}>New Escrow Transaction</Text>
            <Ionicons name="arrow-forward" size={16} color="#053014" />
          </TouchableOpacity>
        </View>

        {/* Quick Transfer */}
        <View style={styles.quickTransferCard}>
          <Text style={styles.sectionTitle}>Quick Transfer</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.userScroll}
          >
            {recentUsers.map((user) => (
              <TouchableOpacity key={user.id} style={styles.userItem}>
                <View style={styles.userImageContainer}>
                  <Image
                    source={{ uri: user.image }}
                    style={styles.userImage}
                  />
                </View>
                <Text style={styles.userName}>{user.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Transaction History */}
        <View style={styles.transactionCard}>
          <View style={styles.transactionHeader}>
            <Text style={styles.sectionTitle}>Transaction History</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionList}>
            {transactions.map((tx) => {
              const statusStyle = getStatusStyle(tx.status);
              return (
                <TouchableOpacity key={tx.id} style={styles.transactionItem}>
                  <View style={styles.transactionLeft}>
                    <Image
                      source={{ uri: tx.image }}
                      style={styles.transactionImage}
                    />
                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionName} numberOfLines={1}>
                        {tx.fullName}
                      </Text>
                      <Text style={styles.transactionPhone} numberOfLines={1}>
                        {tx.phoneNumber}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.transactionRight}>
                    <Text
                      style={[
                        styles.transactionAmount,
                        tx.direction === "in" && styles.amountIn,
                      ]}
                    >
                      {tx.direction === "in" ? "+" : "-"}${tx.amount.toFixed(2)}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: statusStyle.bg },
                      ]}
                    >
                      <Text
                        style={[styles.statusText, { color: statusStyle.text }]}
                      >
                        {tx.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
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
  scrollView: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: COLORS.white,
    padding: 24,
    marginBottom: 16,
  },
  balanceHeader: {
    marginBottom: 2,
  },
  balanceLabel: {
    fontSize: 14,

    color: "#6B7280",
    fontFamily: FONTS.medium,
  },
  balanceAmount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  balanceText: {
    fontSize: 36,

    color: "#111827",
    fontFamily: FONTS.semibold,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.pri,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  secondaryButtonText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: FONTS.medium,
  },
  tagSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  tagText: {
    fontSize: 14,

    color: COLORS.pri,
    fontFamily: FONTS.medium,
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  copyButtonText: {
    fontSize: 12,
    color: COLORS.pri,
    fontFamily: FONTS.medium,
  },
  escrowButtonContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  escrowButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.pri,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  escrowButtonText: {
    color: COLORS.pri,
    fontSize: 14,
    fontFamily: FONTS.semibold,
  },
  quickTransferCard: {
    backgroundColor: COLORS.white,
    padding: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    color: "#111827",
    marginBottom: 16,
  },
  userScroll: {
    flexDirection: "row",
  },
  userItem: {
    alignItems: "center",
    marginRight: 16,
    width: 60,
  },
  userImageContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.pri,
    overflow: "hidden",
    marginBottom: 8,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  userName: {
    fontSize: 12,

    color: "#111827",
    textAlign: "center",
    fontFamily: FONTS.medium,
  },
  transactionCard: {
    backgroundColor: COLORS.white,
    padding: 24,
    marginBottom: 10,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.pri,
    fontFamily: FONTS.medium,
  },
  transactionList: {
    gap: 16,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  transactionImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 14,

    color: "#111827",
    marginBottom: 2,
    fontFamily: FONTS.medium,
  },
  transactionPhone: {
    fontSize: 12,
    color: "#9CA3AF",
    fontFamily: FONTS.light,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 14,

    color: "#111827",
    marginBottom: 4,
    fontFamily: FONTS.semibold,
  },
  amountIn: {
    color: "#059669",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: FONTS.medium,
  },
});

export default Dashboard;

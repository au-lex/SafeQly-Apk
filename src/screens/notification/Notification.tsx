import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, FlatList, 
  SafeAreaView, StatusBar, StyleSheet, ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/utils/colors';
import { FONTS } from '@/utils/font';

// --- Types ---
type NotificationType = 'transaction' | 'security' | 'system' | 'milestone';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  timestamp: string;
  amount?: string;
}

// --- Mock Data ---
const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Funds Released',
    message: 'Buyer approved release for Milestone #2.',
    type: 'transaction',
    isRead: false,
    timestamp: '2m ago',
    amount: '$1,200.00'
  },
  {
    id: '2',
    title: 'New Login Attempt',
    message: 'Login detected from iPhone 14, London.',
    type: 'security',
    isRead: false,
    timestamp: '2h ago',
  },
  {
    id: '3',
    title: 'Dispute Raised',
    message: 'A dispute has been opened for Order #9921.',
    type: 'system',
    isRead: true,
    timestamp: '1d ago',
  },
  {
    id: '4',
    title: 'Milestone Deadline',
    message: 'Final Delivery is due in 24 hours.',
    type: 'milestone',
    isRead: true,
    timestamp: '2d ago',
  },
];

export default function NotificationScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'transaction' | 'security'>('all');

  // --- Actions ---
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getUnreadCount = () => notifications.filter(n => !n.isRead).length;

  // --- Filter Logic ---
  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !n.isRead;
    return n.type === activeFilter;
  });

  // --- UI Helpers ---
  const getIconConfig = (type: NotificationType) => {
    switch (type) {
      case 'transaction': return { name: 'dollar-sign', color: COLORS.green, bg: '#F0FDF4' }; // green-50
      case 'security': return { name: 'shield', color: COLORS.red, bg: '#FEF2F2' }; // red-50
      case 'milestone': return { name: 'flag', color: '#2563EB', bg: '#EFF6FF' }; // blue-50
      case 'system': return { name: 'alert-triangle', color: COLORS.amber, bg: '#FFFBEB' }; // amber-50
      default: return { name: 'bell', color: COLORS.gray500, bg: COLORS.gray100 };
    }
  };

  const renderItem = ({ item }: { item: Notification }) => {
    const iconConfig = getIconConfig(item.type);
    
    return (
      <TouchableOpacity 
        style={[styles.card, item.isRead ? styles.cardRead : styles.cardUnread]}
        onPress={() => markAsRead(item.id)}
        activeOpacity={0.7}
      >
        {/* Left Icon */}
        <View style={[styles.iconContainer, { backgroundColor: iconConfig.bg }]}>
          <Feather name={iconConfig.name as any} size={20} color={iconConfig.color} />
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={[styles.title, !item.isRead && styles.titleBold]}>
              {item.title}
            </Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
          
          <Text 
            numberOfLines={2} 
            style={[styles.message, item.isRead ? styles.textGray : styles.textDark]}
          >
            {item.message}
          </Text>

          {item.amount && (
            <View style={styles.amountTag}>
              <Text style={styles.amountText}>{item.amount}</Text>
            </View>
          )}
        </View>

        {/* Unread Dot */}
        {!item.isRead && (
          <View style={styles.unreadDot} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>
            You have {getUnreadCount()} unread messages
          </Text>
        </View>
        <TouchableOpacity 
          onPress={markAllAsRead} 
          style={styles.markAllButton}
          disabled={getUnreadCount() === 0}
        >
          <Feather 
            name="check-circle" 
            size={20} 
            color={getUnreadCount() > 0 ? COLORS.pri : COLORS.gray100} 
          />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {(['all', 'unread', 'transaction', 'security'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterChip,
                activeFilter === filter ? styles.filterChipActive : styles.filterChipInactive
              ]}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter ? styles.filterTextActive : styles.filterTextInactive
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="bell-off" size={40} color={COLORS.gray100} />
            <Text style={styles.emptyText}>No notifications found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.pri,
  },
  headerSubtitle: {
    fontFamily: FONTS.light,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  markAllButton: {
    padding: 8,
  },
  filterWrapper: {
    height: 50,
  },
  filterContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
    borderWidth: 1,
  },
  filterChipActive: {
    backgroundColor: COLORS.pri,
    borderColor: COLORS.pri,
  },
  filterChipInactive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
  },
  filterText: {
    fontFamily: FONTS.medium,
    textTransform: 'capitalize',
    fontSize: 12,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  filterTextInactive: {
    color: COLORS.textSecondary,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
    borderColor: COLORS.border,
  },
  cardUnread: {
    backgroundColor: COLORS.white, 
    borderColor: COLORS.border,

  },
  cardRead: {
    backgroundColor: COLORS.gray50,

  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
    marginRight: 8,
  },
  titleBold: {
    fontFamily: FONTS.bold,
  },
  timestamp: {
    fontFamily: FONTS.light,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  message: {
    fontFamily: FONTS.light,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  textDark: {
    color: COLORS.text,
  },
  textGray: {
    color: COLORS.textSecondary,
  },
  amountTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0FDF4', // green-50
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BBF7D0', // green-200
  },
  amountText: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.green,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB', // Blue
    position: 'absolute',
    top: 16,
    right: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
    marginTop: 12,
  },
});
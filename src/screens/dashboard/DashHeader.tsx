import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/utils/colors';
import { FONTS } from '@/utils/font';

interface DashboardHeaderProps {
  userName?: string;
  profileImage?: string;
  notificationCount?: number;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName = 'Script Dev',
  profileImage = 'https://i.pinimg.com/736x/f2/d5/34/f2d53404d89392ecc4d8ec685a12cdbb.jpg',
  notificationCount = 0,
  onNotificationPress,
  onProfilePress,
}) => {

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.headerLeft} 
        onPress={onProfilePress}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.greetingText}>{getGreeting()} 👋</Text>
          <Text style={styles.profileName}>{userName}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.notificationButton}
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <Ionicons name="notifications-outline" size={24} color="#111827" />
        {notificationCount > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>
              {notificationCount > 99 ? '99+' : notificationCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,

  },
  greetingText: {
    fontSize: 13,
    color: COLORS.text,
    fontFamily: FONTS.light,

  },
  profileName: {
    fontSize: 16,

    color: COLORS.text,
    fontFamily: FONTS.medium,
    lineHeight: 20,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
  },
});

export default DashboardHeader;
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
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
        <Ionicons name="notifications-outline" size={24} color="#fff" />
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
    // Transparent background
    backgroundColor: 'transparent', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop:19,
    zIndex: 10,
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
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  greetingText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: FONTS.light,
  },
  profileName: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: FONTS.medium,
    lineHeight: 20,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
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
    borderColor: '#042f2e',
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
// SettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import SettingsItem from './SettingsItem';
import type { SettingsOption } from '@/types';
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";

const SettingsScreen: React.FC = () => {
  const [userProfile] = useState({
    name: 'My Profile',
    avatar: 'https://i.pravatar.cc/150?img=68'
  });

  const handleMyProfile = (): void => {
    console.log('Navigate to My Profile');
    Alert.alert('Navigation', 'Navigate to My Profile');
  };

  const handleAccountSettings = (): void => {
    console.log('Navigate to Account Settings');
    Alert.alert('Navigation', 'Navigate to Account Settings');
  };

  const handleChangePassword = (): void => {
    console.log('Navigate to Change Password');
    Alert.alert('Navigation', 'Navigate to Change Password');
  };

  const handleChangePin = (): void => {
    console.log('Navigate to Change Pin');
    Alert.alert('Navigation', 'Navigate to Change Pin');
  };

  const handleHelpSupport = (): void => {
    console.log('Navigate to Help & Support');
    Alert.alert('Navigation', 'Navigate to Help & Support');
  };

  const handleLogout = (): void => {
    console.log('Logout');
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Logging out...');
          }
        }
      ]
    );
  };

  const settingsOptions: SettingsOption[] = [
    {
      id: 'account-settings',
      title: 'Account Settings',
      description: 'Add/remove account details',
      icon: <MaterialIcons name="business" size={20} color="#053014" />,
      iconBgColor: '#eef2ff',
      action: handleAccountSettings
    },
    {
      id: 'change-password',
      title: 'Change Password',
      description: 'Change your password',
      icon: <Ionicons name="lock-closed" size={20} color="#053014" />,
      iconBgColor: '#eef2ff',
      action: handleChangePassword
    },
    {
      id: 'change-pin',
      title: 'Change Pin',
      description: 'Change your pin',
      icon: <Ionicons name="key" size={20} color="#053014" />,
      iconBgColor: '#eef2ff',
      action: handleChangePin
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      description: 'Contact help & support',
      icon: <Ionicons name="help-circle" size={20} color="#053014" />,
      iconBgColor: '#eef2ff',
      action: handleHelpSupport
    },
    {
      id: 'logout',
      title: 'Log Out',
      description: 'Log out of your account',
      icon: <Ionicons name="log-out" size={20} color="#ef4444" />,
      iconBgColor: '#fee2e2',
      action: handleLogout,
      showArrow: false
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Settings
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {/* My Profile - Special Card */}
          <TouchableOpacity
            onPress={handleMyProfile}
            activeOpacity={0.7}
            style={styles.profileCard}
          >
            <Image
              source={{ uri: userProfile.avatar }}
              style={styles.profileAvatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {userProfile.name}
              </Text>
              <Text style={styles.profileSubtext}>
                View your profile
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {/* Settings Options */}
          <View style={styles.settingsCard}>
            {settingsOptions.map((option, index) => (
              <View key={option.id}>
                <SettingsItem option={option} />
       
              </View>
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
  header: {
    backgroundColor: COLORS.white,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,

  },
  headerTitle: {
    fontSize: 22,
    fontFamily: FONTS.semibold,
    color: COLORS.pri,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',

  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    color: COLORS.text,
    marginBottom: 2,
  },
  profileSubtext: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  settingsCard: {
 
    

  },

});

export default SettingsScreen
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfirmUserModal from '../escrowModal/ConfirmUser';
import { useRouter } from 'expo-router';
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";

interface UserInfo {
  name: string;
  tag: string;
  avatar: string;
}

const EnterTagScreen: React.FC = () => {
  const router = useRouter();
  const [userTag, setUserTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleSearchUser = () => {
    if (userTag.trim()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setUserInfo({
          name: 'Abimbola David',
          tag: 'Tag320b56',
          avatar: 'https://i.pravatar.cc/150?img=33',
        });
        setIsLoading(false);
        setShowConfirmModal(true);
      }, 1000);
    }
  };

  const handleConfirmUser = () => {
    setShowConfirmModal(false);
    router.push('/newEscrow/newEscrow');
    // Navigate to CreateEscrowScreen with userInfo
    console.log('Navigate to CreateEscrowScreen with:', userInfo);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setUserInfo(null);
  };

  return (
    <SafeAreaView style={styles.container}>

      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Escrow</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* User Tag Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Enter User Tag</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.tagPrefix}>Tag: </Text>
            <TextInput
              style={styles.input}
              value={userTag}
              onChangeText={setUserTag}
              placeholder="29030"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[styles.primaryButton, (!userTag.trim() || isLoading) && styles.disabledButton]}
          onPress={handleSearchUser}
          disabled={!userTag.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <ActivityIndicator color="#FFFFFF" size="small" />
          )}
        </TouchableOpacity>
      </View>

      {/* Confirm User Modal */}
      <ConfirmUserModal
        visible={showConfirmModal}
        userInfo={userInfo}
        onConfirm={handleConfirmUser}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Poppins-SemiBold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tagPrefix: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Poppins-Regular',
  },
  bottomContainer: {
    padding: 24,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  primaryButton: {
    backgroundColor: COLORS.pri,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: COLORS.gray100,
  },
});

export default EnterTagScreen;
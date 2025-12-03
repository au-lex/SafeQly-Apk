import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";

interface UserInfo {
  name: string;
  tag: string;
  avatar: string;
}

interface ConfirmUserModalProps {
  visible: boolean;
  userInfo: UserInfo | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmUserModal: React.FC<ConfirmUserModalProps> = ({
  visible,
  userInfo,
  onConfirm,
  onCancel,
}) => {
  if (!userInfo) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Confirm User Info</Text>
            <TouchableOpacity onPress={onCancel}>
              <Ionicons name="close" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalUserInfo}>
            <Image 
              source={{ uri: userInfo.avatar }} 
              style={styles.modalAvatar} 
            />
            <View>
              <Text style={styles.modalUserName}>{userInfo.name}</Text>
              <Text style={styles.modalUserTag}>{userInfo.tag}</Text>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,

    color: '#111827',
    fontFamily:FONTS.semibold,
  },
  modalUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  modalUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: FONTS.medium,
  },
  modalUserTag: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
    fontFamily: FONTS.light,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: FONTS.medium,
  },
  confirmButton: {
    flex: 1,
    backgroundColor:COLORS.pri,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 15,

    fontFamily:FONTS.semibold,
  },
});

export default ConfirmUserModal;
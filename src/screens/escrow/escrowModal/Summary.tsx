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

interface UserInfo {
  name: string;
  tag: string;
  avatar: string;
}

interface TransactionSummaryModalProps {
  visible: boolean;
  userInfo: UserInfo;
  amount: string;
  items: string;
  deliveryDate: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const TransactionSummaryModal: React.FC<TransactionSummaryModalProps> = ({
  visible,
  userInfo,
  amount,
  items,
  deliveryDate,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.summaryModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Transaction Summary</Text>
            <TouchableOpacity onPress={onCancel}>
              <Ionicons name="close" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          <View style={styles.summaryAmount}>
            <Text style={styles.summaryAmountLabel}>Amount</Text>
            <Text style={styles.summaryAmountValue}>${amount}</Text>
          </View>

          <View style={styles.summaryUserRow}>
            <View style={styles.summaryUser}>
              <Image 
                source={{ uri: userInfo.avatar }} 
                style={styles.summaryAvatar} 
              />
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?img=68' }} 
                style={[styles.summaryAvatar, styles.summaryAvatarOverlap]} 
              />
            </View>
            <View style={styles.summaryUserInfo}>
              <Text style={styles.summaryUserName}>{userInfo.name}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Pending</Text>
                <View style={styles.statusDot} />
              </View>
            </View>
            <Text style={styles.summaryUserAmount}>${amount}</Text>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryIconContainer}>
              <Ionicons name="cash-outline" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.summaryLabel}>Transaction fee:</Text>
            <Text style={styles.summaryValue}>$20</Text>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryIconContainer}>
              <Ionicons name="time-outline" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.summaryLabel}>Est delivery date:</Text>
            <Text style={styles.summaryValue}>{deliveryDate || '2nd jan 2024'}</Text>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryIconContainer}>
              <Ionicons name="cube-outline" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.summaryLabel}>Items:</Text>
            <Text style={styles.summaryValue} numberOfLines={1}>
              {items || 'Iphone 11 pro max, Ipad...'}
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.finalConfirmButton}
            onPress={onConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirm transaction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  summaryModal: {
    backgroundColor: '#FFFFFF',
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
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Poppins-Bold',
  },
  summaryAmount: {
    alignItems: 'center',
    marginBottom: 24,
  },
  summaryAmountLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  summaryAmountValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Poppins-Bold',
  },
  summaryUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  summaryUser: {
    flexDirection: 'row',
    marginRight: 12,
  },
  summaryAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  summaryAvatarOverlap: {
    marginLeft: -12,
  },
  summaryUserInfo: {
    flex: 1,
  },
  summaryUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#F59E0B',
    fontFamily: 'Poppins-Medium',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
  },
  summaryUserAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Poppins-Bold',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  summaryLabel: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Poppins-SemiBold',
    maxWidth: '40%',
  },
  finalConfirmButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
  },
});

export default TransactionSummaryModal;
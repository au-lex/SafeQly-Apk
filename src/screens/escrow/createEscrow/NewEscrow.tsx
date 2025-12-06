import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import TransactionSummaryModal from '../escrowModal/Summary';
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";

interface UserInfo {
  name: string;
  tag: string;
  avatar: string;
}

interface CreateEscrowScreenProps {
  userInfo?: UserInfo;
}

const CreateEscrowScreen: React.FC<CreateEscrowScreenProps> = ({ userInfo }) => {
  const defaultUserInfo: UserInfo = {
    name: 'Abimbola David',
    tag: 'Tag000000',
    avatar: 'https://i.pravatar.cc/150?img=1',
  };

  const currentUserInfo = userInfo || defaultUserInfo;
  const [items, setItems] = useState('');
  const [amount, setAmount] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAttachedFile(result.assets[0].name);
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  const handleConfirmTransaction = () => {
    setShowSummaryModal(true);
  };

  const handleFinalConfirm = () => {
    setShowSummaryModal(false);
    // Handle final transaction confirmation
    console.log('Transaction confirmed!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Escrow</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info Display */}
        <View style={styles.userInfoCard}>
          <Image source={{ uri: currentUserInfo.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{currentUserInfo.name}</Text>
            <Text style={styles.userTag}>{currentUserInfo.tag}</Text>
          </View>
        </View>

        {/* Item(s) Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Item(s)</Text>
          <TextInput
            style={styles.textArea}
            value={items}
            onChangeText={setItems}
            placeholder="Ipad, Macbook, Iphone"
            placeholderTextColor="#9CA3AF"
            multiline
          />
        </View>

        {/* Amount Input */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.balance}>Bal: $23,898.00</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.currency}>$</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="590.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Delivery Date Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Delivery date</Text>
          <TextInput
            style={[styles.inputContainer, { paddingVertical: 16 }]}
            value={deliveryDate}
            onChangeText={setDeliveryDate}
            placeholder="21st jan 2024"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* File Upload Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Attach signed doc (optional)</Text>
          <TouchableOpacity 
            style={styles.uploadBox}
            onPress={handlePickDocument}
          >
            <Ionicons name="add-circle" size={32} color={COLORS.pri} />
            <Text style={styles.uploadTitle}>
              Attach a file or image for evidence
            </Text>
            <Text style={styles.uploadSubtitle}>
              Accepted file type: JPEG, PNG, and PDF
            </Text>
            <Text style={styles.uploadSize}>Size limit: 5MB</Text>
            {attachedFile && (
              <Text style={styles.attachedFile}>📎 {attachedFile}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleConfirmTransaction}
        >
          <Text style={styles.primaryButtonText}>Confirm transaction</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction Summary Modal */}
      <TransactionSummaryModal
        visible={showSummaryModal}
  
        userInfo={currentUserInfo}
        amount={amount}
        items={items}
        deliveryDate={deliveryDate}
        onConfirm={handleFinalConfirm}
        onCancel={() => setShowSummaryModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',

  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: FONTS.medium,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  userInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,

  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: FONTS.medium,
  },
  userTag: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: FONTS.light,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
    fontFamily: FONTS.medium,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balance: {
    fontSize: 14,
    fontWeight: '600',
    color:  COLORS.pri,
    fontFamily: FONTS.medium,
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,

    fontSize: 16,
    color: '#111827',
    minHeight: 60,
    fontFamily: FONTS.light,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,

  },
  currency: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
    marginRight: 4,
    fontFamily: FONTS.medium,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontFamily: FONTS.light,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: COLORS.pri,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
    textAlign: 'center',
    fontFamily: FONTS.medium,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
    fontFamily: FONTS.light,
  },
  uploadSize: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
    fontFamily:  FONTS.light,
  },
  attachedFile: {
    fontSize: 12,
    color: '#059669',
    marginTop: 8,
    fontFamily: FONTS.medium,
  },
  bottomContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  primaryButton: {
    backgroundColor: COLORS.pri,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,

    fontFamily: FONTS.semibold,
  },
});

export default CreateEscrowScreen;
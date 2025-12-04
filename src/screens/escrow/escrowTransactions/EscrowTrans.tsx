// EscrowTrans.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TransactionInfoItem from './EscrowInfoItem';
import ProgressStepItem from './ProgressStepItem';
import type { TransactionDetails, ProgressStep } from '@/types';
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";

const EscrowTrans: React.FC = () => {
  const [transaction] = useState<TransactionDetails>({
    id: '1',
    amount: 590.00,
    userName: 'Abimbola David',
    userTag: 'Tag320b56',
    userAvatar: 'https://i.pravatar.cc/150?img=33',
    status: 'Pending',
    transactionFee: 20,
    estimatedDeliveryDate: '2nd Jan 2024',
    items: 'Iphone 11 pro max, Ipad...'
  });

  const [progressSteps] = useState<ProgressStep[]>([
    {
      id: '1',
      title: 'Transaction Accepted',
      description: '1st Jan 2023 @ 11:09PM',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Processing Transaction',
      description: 'Yesterday',
      status: 'current'
    },
    {
      id: '3',
      title: 'Transaction Completed',
      description: 'Not started',
      status: 'pending'
    }
  ]);

  const handleMarkComplete = (): void => {
    console.log('Mark transaction as complete');
    Alert.alert('Success', 'Transaction marked as complete!');
  };

  const handleBack = (): void => {
    console.log('Navigate back');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              Transactions summary
            </Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            {/* Amount Section */}
            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>
                Amount
              </Text>
              <Text style={styles.amountValue}>
                ${transaction.amount.toFixed(2)}
              </Text>
            </View>

            {/* User Info Card */}
            <View style={styles.userInfoCard}>
              <View style={styles.userInfoLeft}>
                <View style={styles.avatarsContainer}>
                  <Image
                    source={{ uri: transaction.userAvatar }}
                    style={styles.avatar}
                  />
                  <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=68' }}
                    style={styles.avatarOverlap}
                  />
                </View>
                <View>
                  <Text style={styles.userName}>
                    {transaction.userName}
                  </Text>
                  <Text style={styles.userTag}>
                    {transaction.userTag}
                  </Text>
                </View>
              </View>
              <View style={styles.userInfoRight}>
                <Text style={styles.cardAmount}>
                  ${transaction.amount.toFixed(2)}
                </Text>
                <View style={styles.statusContainer}>
                  <Text style={styles.statusText}>
                    {transaction.status}
                  </Text>
                  <View style={styles.statusDot} />
                </View>
              </View>
            </View>

            {/* Transaction Details */}
            <View style={styles.detailsSection}>
              <TransactionInfoItem
                icon={<Ionicons name="cash-outline" size={18} color="#053014" />}
                label="Transaction fee:"
                value={`$${transaction.transactionFee}`}
             
              />
              <TransactionInfoItem
                icon={<Ionicons name="time-outline" size={18} color="#053014" />}
                label="Est delivery date:"
                value={transaction.estimatedDeliveryDate}
          
              />
              <TransactionInfoItem
                icon={<Ionicons name="cube-outline" size={18} color="#053014" />}
                label="Items:"
                value={transaction.items}
           
              />
            </View>

            {/* Transaction Progress */}
            <View style={styles.progressSection}>
              <Text style={styles.progressTitle}>
                Transaction Progress
              </Text>
              <Text style={styles.progressDescription}>
                Update the progress of this transaction to keep the other party notified of the progress.
              </Text>

              <View>
                {progressSteps.map((step, index) => (
                  <ProgressStepItem
                    key={step.id}
                    step={step}
                    isLast={index === progressSteps.length - 1}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={handleMarkComplete}
            style={styles.completeButton}
            activeOpacity={0.8}
          >
            <Text style={styles.completeButtonText}>
              Mark Transaction as Complete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.semibold,
    color: COLORS.pri,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 14,
    fontFamily: FONTS.light,
    color: COLORS.textSecondary,

  },
  amountValue: {
    fontSize: 36,
    fontFamily: FONTS.bold,
    color:COLORS.pri,
  },
  userInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bg,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  userInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarsContainer: {
    flexDirection: 'row',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  avatarOverlap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.white,
    marginLeft: -12,
  },
  userName: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.text,
    marginBottom: 4,
  },
  userTag: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.textSecondary,
  },
  userInfoRight: {
    alignItems: 'flex-end',
  },
  cardAmount: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: '#f59e0b',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f59e0b',
  },
  detailsSection: {
    marginBottom: 32,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 8,
  },
  progressDescription: {
    fontSize: 14,
    fontFamily: FONTS.light,
    color: COLORS.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  bottomContainer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  completeButton: {
    backgroundColor: COLORS.pri,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.semibold,
  },
});

export default EscrowTrans;
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@/utils/colors';
import { FONTS } from '@/utils/font';
import type { RecentTransactionItemProps } from '@/types';

const RecentTransactionItem: React.FC<RecentTransactionItemProps> = ({
  transaction,
  onClick
}) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Pending':
        return COLORS.amber;
      case 'Completed':
        return COLORS.green;
      case 'Declined':
        return COLORS.red;
      default:
        return COLORS.gray500;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onClick(transaction.id)}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <Image
          source={{ uri: transaction.avatar }}
          style={styles.avatar}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.tagText}>{transaction.tag}</Text>
          <Text style={styles.itemsText} numberOfLines={1}>
            {transaction.items}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.amountText}>
          ${transaction.amount.toFixed(2)}
        </Text>
        <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
          {transaction.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,

    borderRadius: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.amber,
  },
  infoContainer: {
    marginLeft: 12,
    flex: 1,
  },
  tagText: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.gray900,
    marginBottom: 2,
  },
  itemsText: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray500,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.gray900,
    marginBottom: 2,
  },
  statusText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
});

export default RecentTransactionItem;
// TransactionItem.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { TransactionItemProps } from '@/types';
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onClick }) => {
  const isIncoming = transaction.type === 'wallet_funded' || transaction.type === 'escrow_received';
  
  const getIconConfig = () => {
    if (isIncoming) {
      return {
        iconName: 'arrow-down' as const,
        bgColor: COLORS.pri
      };
    }
    return {
      iconName: 'arrow-up' as const,
      bgColor: COLORS.red
    };
  };

  const { iconName, bgColor } = getIconConfig();

  return (
    <TouchableOpacity
      onPress={() => onClick(transaction.id)}
      activeOpacity={0.6}
      style={styles.container}
    >
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
          <Ionicons name={iconName} size={20} color={COLORS.white} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {transaction.title}
          </Text>
          <Text
            style={styles.description}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {transaction.description}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={[
          styles.amount,
          isIncoming && styles.amountIncoming
        ]}>
          {isIncoming ? '+' : '-'}${transaction.amount.toFixed(2)}
        </Text>
        <Text style={styles.timestamp}>
          {transaction.timestamp}
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
    marginVertical: 6,
    backgroundColor: COLORS.white,
    padding: 12,


    borderRadius: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.text,

  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.textSecondary,
  },
  rightSection: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  amount: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 4,
  },
  amountIncoming: {
    color: '#16a34a',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
});

export default TransactionItem;
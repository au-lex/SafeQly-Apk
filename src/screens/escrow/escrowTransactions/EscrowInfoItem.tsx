// EscrowInfoItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { TransactionInfoItemProps } from '@/types';
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";

const EscrowInfoItem: React.FC<TransactionInfoItemProps> = ({
  icon,
  label,
  value,
  iconBgColor = COLORS.bg,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        {icon}
      </View>
      <Text style={styles.label}>
        {label}
      </Text>
      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.light,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.text,
  },
});

export default EscrowInfoItem;
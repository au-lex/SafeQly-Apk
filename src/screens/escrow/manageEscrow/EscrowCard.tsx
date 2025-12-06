

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Path, Line } from 'react-native-svg';

import type { TransactionRequestCardProps } from '@/types';
import { COLORS } from '@/utils/colors';
import { FONTS } from '@/utils/font';

const TagIcon: React.FC = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={COLORS.white} strokeWidth={2}>
    <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <Line x1={7} y1={7} x2={7.01} y2={7} />
  </Svg>
);

const EscrowCard: React.FC<TransactionRequestCardProps> = ({
  request,
  onAccept,
  onDecline,
  onViewInfo
}) => {
  return (
    <View style={styles.card}>
      {/* Tag Header */}
      <View style={styles.tagHeader}>
        <View style={styles.tagIconContainer}>
          <TagIcon />
        </View>
        <View style={styles.tagInfo}>
          <Text style={styles.tagText}>{request.tag}</Text>
          <Text style={styles.timestampText}>{request.timestamp}</Text>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: request.avatar }}
          style={styles.avatar}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{request.name}</Text>
          <Text style={styles.amountText}>Amount: ${request.amount}</Text>
          <Text style={styles.itemsText} numberOfLines={1}>
            Items: {request.items}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => onAccept(request.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.declineButton]}
          onPress={() => onDecline(request.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.infoButton]}
          onPress={() => onViewInfo(request.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.infoButtonText}>View Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,

    marginBottom: 16,

  },
  tagHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tagIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.pri,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagInfo: {
    marginLeft: 12,
  },
  tagText: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.gray900,
  },
  timestampText: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.gray500,
    marginTop: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.amber,
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    color: COLORS.gray900,
    marginBottom: 4,
  },
  amountText: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.gray900,
    marginBottom: 4,
  },
  itemsText: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.gray500,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: COLORS.pri,
  },
  declineButton: {
    backgroundColor: COLORS.red,
  },
  infoButton: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 12,
    flex: 0,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.white,
  },
  infoButtonText: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.text,
  },
});

export default EscrowCard;
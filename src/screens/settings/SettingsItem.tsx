// SettingsItem.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { SettingsItemProps } from '@/types';
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";

const SettingsItem: React.FC<SettingsItemProps> = ({ option }) => {
  return (
    <TouchableOpacity
      onPress={option.action}
      activeOpacity={0.6}
      style={styles.container}
    >
      <View style={styles.leftSection}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: option.iconBgColor }
          ]}
        >
          {option.icon}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {option.title}
          </Text>
          <Text style={styles.description}>
            {option.description}
          </Text>
        </View>
      </View>
      
      {option.showArrow !== false && (
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color={COLORS.textSecondary} 
          style={styles.arrow} 
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: COLORS.white,
    borderRadius: 12,
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
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.textSecondary,
  },
  arrow: {
    marginLeft: 12,
  },
});

export default SettingsItem;
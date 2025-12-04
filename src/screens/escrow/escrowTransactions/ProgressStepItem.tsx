
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { type ProgressStepItemProps } from '@/types';
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";

const ProgressStepItem: React.FC<ProgressStepItemProps> = ({ step, isLast }) => {
  const getIconContent = () => {
    if (step.status === 'completed' || step.status === 'current') {
      return (
        <View style={styles.iconActive}>
          <Ionicons name="checkmark" size={16} color={COLORS.white} />
        </View>
      );
    }
    
    return (
      <View style={styles.iconInactive} />
    );
  };

  const getTextColor = () => {
    if (step.status === 'pending') {
      return COLORS.textSecondary;
    }
    return COLORS.text;
  };

  const getDescriptionColor = () => {
    if (step.status === 'pending') {
      return COLORS.textSecondary;
    }
    return COLORS.textSecondary;
  };

  return (
    <View style={styles.container}>
      {/* Icon and Line Container */}
      <View style={styles.iconLineContainer}>
        {getIconContent()}
        {!isLast && (
          <View style={[
            styles.connectingLine,
            { backgroundColor: step.status === 'completed' ? '#6366f1' : COLORS.border }
          ]} />
        )}
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: getTextColor() }]}>
          {step.title}
        </Text>
        <Text style={[styles.description, { color: getDescriptionColor() }]}>
          {step.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  iconLineContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  iconActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.pri,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInactive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  connectingLine: {
    width: 2,
    height: 48,
    marginTop: 8,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 32,
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.light,
  },
});

export default ProgressStepItem;
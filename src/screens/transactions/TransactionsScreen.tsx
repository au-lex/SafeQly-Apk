// TransactionsScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';
import type { Transaction, TabType } from '@/types';
import { useRouter } from 'expo-router';
import { COLORS } from "@/utils/colors";
import { FONTS } from "@/utils/font";
import DashboardHeader from '../dashboard/DashHeader';

const TransactionsScreen: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('escrow');

  const [allTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'wallet_funded',
      title: 'Wallet Funded',
      description: 'Your wallet has been fu...',
      amount: 25.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '2',
      type: 'money_withdrawn',
      title: 'Money Withdrawn',
      description: 'Money has been withd...',
      amount: 89.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '3',
      type: 'wallet_funded',
      title: 'Wallet Funded',
      description: 'Your wallet has been fu...',
      amount: 49.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '4',
      type: 'money_withdrawn',
      title: 'Money Withdrawn',
      description: 'Money has been withd...',
      amount: 10.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '5',
      type: 'wallet_funded',
      title: 'Wallet Funded',
      description: 'Your wallet has been fu...',
      amount: 25.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '6',
      type: 'money_withdrawn',
      title: 'Money Withdrawn',
      description: 'Money has been withd...',
      amount: 89.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '7',
      type: 'wallet_funded',
      title: 'Wallet Funded',
      description: 'Your wallet has been fu...',
      amount: 49.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '8',
      type: 'money_withdrawn',
      title: 'Money Withdrawn',
      description: 'Money has been withd...',
      amount: 10.00,
      timestamp: '07:15 AM',
      category: 'wallet'
    },
    {
      id: '9',
      type: 'escrow_payment',
      title: 'Escrow Payment',
      description: 'Payment sent via escrow',
      amount: 590.00,
      timestamp: '07:15 AM',
      category: 'escrow'
    },
    {
      id: '10',
      type: 'escrow_received',
      title: 'Escrow Received',
      description: 'Payment received via escrow',
      amount: 120.00,
      timestamp: '06:30 AM',
      category: 'escrow'
    }
  ]);

  const filteredTransactions = allTransactions.filter(
    transaction => transaction.category === activeTab
  );

  const handleTransactionClick = (id: string): void => {
    if (activeTab === 'escrow') {
      router.push('/escrow-transactions');
    }
  };

  return (
    <View style={styles.container}>
      {/* <DashboardHeader /> */}
      <View style={styles.innerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Transactions
          </Text>
          
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              onPress={() => setActiveTab('escrow')}
              style={styles.tabButton}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'escrow' && styles.tabTextActive
              ]}>
                Escrow Transactions
              </Text>
              {activeTab === 'escrow' && (
                <View style={styles.tabIndicator} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setActiveTab('wallet')}
              style={styles.tabButton}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'wallet' && styles.tabTextActive
              ]}>
                Wallet Transactions
              </Text>
              {activeTab === 'wallet' && (
                <View style={styles.tabIndicator} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Transactions List */}
        <ScrollView style={styles.scrollView}>
          {filteredTransactions.length > 0 ? (
            <View>
              {filteredTransactions.map((transaction, index) => (
                <View key={transaction.id}>
                  <TransactionItem
                    transaction={transaction}
                    onClick={handleTransactionClick}
                  />
        
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No transactions found
              </Text>
            </View>
          )}
        </ScrollView>
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

  },
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
    paddingTop: 20,
  
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: FONTS.semibold,
    color: COLORS.pri,
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  tabButton: {
    paddingBottom: 12,
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.pri,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.pri,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
});

export default TransactionsScreen;
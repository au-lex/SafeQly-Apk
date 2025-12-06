import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import TransactionRequestCard from './EscrowCard';
import RecentTransactionItem from './EscrowHomeTrans';
import type { TransactionRequest, RecentTransaction } from '@/types';
import { COLORS } from '@/utils/colors';
import { FONTS } from '@/utils/font';

const EscrowHome: React.FC = () => {
  const router = useRouter();
  const [showAllRequests, setShowAllRequests] = useState(false);
  

  const [transactionRequests] = useState<TransactionRequest[]>([
    {
      id: '1',
      tag: 'Tag32BG6',
      name: 'Abimbola David',
      avatar: 'https://i.pravatar.cc/150?img=33',
      amount: 95,
      items: 'Ipad, Nike shoe, Macbook pro',
      timestamp: '07:15 AM'
    },
    {
      id: '2',
      tag: 'Tag32BG6',
      name: 'Sola Adewale',
      avatar: 'https://i.pravatar.cc/150?img=12',
      amount: 150,
      items: 'Samsung TV, Headphone, Wris...',
      timestamp: '09:30 AM'
    }
  ]);

  const [recentTransactions] = useState<RecentTransaction[]>([
    {
      id: '1',
      tag: 'Tag32Gb6',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=33',
      amount: 25.00,
      items: 'Nike shoe, Airpod, Wris...',
      status: 'Pending',
      timestamp: '07:15 AM'
    },
    {
      id: '2',
      tag: 'Tag32Gb6',
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=45',
      amount: 89.00,
      items: 'Nike shoe, Airpod, Wris...',
      status: 'Completed',
      timestamp: '07:15 AM'
    },
    {
      id: '3',
      tag: 'Tag32Gb6',
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=12',
      amount: 49.00,
      items: 'Nike shoe, Airpod, Wris...',
      status: 'Completed',
      timestamp: '07:15 AM'
    },
    {
      id: '4',
      tag: 'Tag32Gb6',
      name: 'Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?img=47',
      amount: 10.00,
      items: 'Nike shoe, Airpod, Wris...',
      status: 'Pending',
      timestamp: '07:15 AM'
    }
  ]);


  const dashboardStats = useMemo(() => {
    const totalVolume = recentTransactions.reduce((acc, curr) => acc + curr.amount, 0);
    
    const pendingVolume = recentTransactions
      .filter(t => t.status === 'Pending')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const completedVolume = recentTransactions
      .filter(t => t.status === 'Completed')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const pendingActionCount = transactionRequests.length + recentTransactions.filter(t => t.status === 'Pending').length;
    
    return { totalVolume, pendingVolume, completedVolume, pendingActionCount };
  }, [recentTransactions, transactionRequests]);

  const particles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100, // Random percentage
      left: Math.random() * 100,
      size: Math.random() * 6 + 3, // Random size between 3 and 9
      opacity: Math.random() * 0.15 + 0.05, // Random opacity 0.05 to 0.2
    }));
  }, []);


  const toggleRequests = () => {

    setShowAllRequests(!showAllRequests);
  };

  const handleAccept = (id: string): void => console.log('Accept:', id);
  const handleDecline = (id: string): void => console.log('Decline:', id);
  const handleViewInfo = (id: string): void => router.push('/escrow-transactions');
  const handleTransactionClick = (id: string): void => router.push('/escrow-transactions');
  const handleNewEscrow = (): void => router.push('/newEscrow/enterTag');

  const visibleRequests = showAllRequests 
    ? transactionRequests 
    : transactionRequests.slice(0, 1);
  const remainingCount = transactionRequests.length - 1;

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Escrow</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleNewEscrow} activeOpacity={0.8}>
          <Ionicons name="add" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* DASHBOARD */}
          <View style={styles.dashboardContainer}>
            
            {/* Background Particles Layer */}
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
              {particles.map((p) => (
                <View
                  key={p.id}
                  style={{
                    position: 'absolute',
                    top: `${p.top}%`,
                    left: `${p.left}%`,
                    width: p.size,
                    height: p.size,
                    borderRadius: p.size / 2,
                    backgroundColor: 'white',
                    opacity: p.opacity,
                  }}
                />
              ))}
            </View>

            {/* Top Row */}
            <View style={styles.dashRow}>
                <View style={styles.dashItem}>
                    <Text style={styles.dashLabel}>Total Escrow</Text>
                    <Text style={styles.dashValueBig}>${dashboardStats.totalVolume.toFixed(2)}</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.dashItem}>
                    <Text style={styles.dashLabel}>Active Actions</Text>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.dashValueBig}>{dashboardStats.pendingActionCount}</Text>
                        <View style={styles.activeDot} />
                    </View>
                </View>
            </View>

            <View style={styles.horizontalDivider} />

            {/* Bottom Row */}
            <View style={styles.dashRow}>
                <View style={styles.dashItem}>
                    <Text style={styles.dashLabel}>Total Pending</Text>
                    <Text style={styles.dashValueSmall}>${dashboardStats.pendingVolume.toFixed(2)}</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.dashItem}>
                    <Text style={styles.dashLabel}>Total Completed</Text>
                    <Text style={styles.dashValueSmall}>${dashboardStats.completedVolume.toFixed(2)}</Text>
                </View>
            </View>

          </View>

          {/* Transaction Requests */}
          {transactionRequests.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    Transaction requests <Text style={{color: COLORS.pri}}>({transactionRequests.length})</Text>
                </Text>
              </View>

              {visibleRequests.map((request) => (
                <TransactionRequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                  onViewInfo={handleViewInfo}
                />
              ))}

              {transactionRequests.length > 1 && (
                <TouchableOpacity 
                    style={styles.toggleButton} 
                    onPress={toggleRequests}
                    activeOpacity={0.7}
                >
                    <Text style={styles.toggleText}>
                        {showAllRequests ? "Show Less" : `Show ${remainingCount} More`}
                    </Text>
                    <Ionicons 
                        name={showAllRequests ? "chevron-up" : "chevron-down"} 
                        size={16} 
                        color={COLORS.gray500} 
                    />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Recent Transactions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <View style={styles.transactionsContainer}>
              {recentTransactions.map((transaction) => (
                <RecentTransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onClick={handleTransactionClick}
                />
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.semibold,
    color: COLORS.gray900,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.pri,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: 16,
  },
  

  dashboardContainer: {
    backgroundColor: COLORS.pri,
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
    shadowColor: COLORS.pri,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden', 
    position: 'relative',
  },
  dashRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  dashItem: {
    flex: 1,
    paddingVertical: 8,
  },
  dashLabel: {
    fontSize: 11,
    fontFamily: FONTS.medium,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  dashValueBig: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  dashValueSmall: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    color: COLORS.white,
  },
  verticalDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 16,
  },
  horizontalDivider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.amber,
    marginTop: 4,
  },

  // --- SECTION STYLES ---
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.gray900,
  },
  

  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderRadius: 2,

    marginTop: -8,
  },
  toggleText: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.gray500,
    marginRight: 4,
  },
  
  transactionsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
  },
});

export default EscrowHome;
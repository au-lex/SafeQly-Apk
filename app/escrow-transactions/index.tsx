import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeLayout from '@/safeLayout/SafeLayout'
import EscrowTrans from '@/src/screens/escrow/escrowTransactions/EscrowTrans'

const index = () => {
  return (
    <SafeLayout>

    <View style={{flex:1, }}>
    <EscrowTrans />
    </View>
    </SafeLayout>
  )
}

export default index

const styles = StyleSheet.create({})
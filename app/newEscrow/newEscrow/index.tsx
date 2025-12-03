import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeLayout from '@/safeLayout/SafeLayout'

import CreateEscrowScreen from '@/src/screens/escrow/createEscrow/NewEscrow'

const index = () => {
  return (
    <SafeLayout>

    <View style={{flex:1, }}>
     <CreateEscrowScreen />
    </View>
    </SafeLayout>
  )
}

export default index

const styles = StyleSheet.create({})
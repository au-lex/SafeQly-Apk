import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeLayout from '@/safeLayout/SafeLayout'
import EnterTagScreen from '@/src/screens/escrow/createEscrow/EnterTag'

const index = () => {
  return (
    <SafeLayout>

    <View style={{flex:1, }}>
     <EnterTagScreen />
    </View>
    </SafeLayout>
  )
}

export default index

const styles = StyleSheet.create({})
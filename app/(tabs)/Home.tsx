import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeLayout from '@/safeLayout/SafeLayout'
import Dashboard from '@/src/screens/dashboard/Dashboard'

const index = () => {
  return (
    <SafeLayout>

    <View style={{flex:1, }}>
<Dashboard />
    </View>
    </SafeLayout>
  )
}

export default index

const styles = StyleSheet.create({})
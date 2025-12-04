import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeLayout from '@/safeLayout/SafeLayout'
import SettingsScreen from '@/src/screens/settings/Settings'

const index = () => {
  return (
    <SafeLayout>

    <View style={{flex:1, }}>
    <SettingsScreen />
    </View>
    </SafeLayout>
  )
}

export default index

const styles = StyleSheet.create({})
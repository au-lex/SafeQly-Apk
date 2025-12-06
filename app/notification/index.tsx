import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeLayout from '@/safeLayout/SafeLayout'
import NotificationScreen from '@/src/screens/notification/Notification'

const index = () => {
  return (
    <SafeLayout>

    <View style={{flex:1, }}>
   <NotificationScreen />
    </View>
    </SafeLayout>
  )
}

export default index

const styles = StyleSheet.create({})
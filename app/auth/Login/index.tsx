import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '@/src/screens/auth/login/Login'
import SafeLayout from '@/safeLayout/SafeLayout'

const index = () => {
  return (
    <SafeLayout>

    <View style={{flex:1, }}>
     <Login />
    </View>
    </SafeLayout>
  )
}

export default index

const styles = StyleSheet.create({})
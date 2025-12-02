import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import SafeLayout from '@/safeLayout/SafeLayout'
import ForgotPassword from '@/src/screens/auth/forgot-psw/ForgotPsw'

const index = () => {
  return (
    <SafeLayout>

    <View style={{flex:1, }}>
     <ForgotPassword />
    </View>
    </SafeLayout>
  )
}

export default index

const styles = StyleSheet.create({})
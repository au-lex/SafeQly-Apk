import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import SafeLayout from '@/safeLayout/SafeLayout'
import ResetPassword from '@/src/screens/auth/reset-psw/ResetPsw'

const index = () => {
  return (
    <SafeLayout>

    <View style={{flex:1, }}>
     <ResetPassword />
    </View>
    </SafeLayout>
  )
}

export default index

const styles = StyleSheet.create({})
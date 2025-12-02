import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import OnboardingSide from '@/src/screens/onboarding/Onboarding'

const index = () => {
  return (


    <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
<OnboardingSide  />
    </View>
  )
}

export default index

const styles = StyleSheet.create({})
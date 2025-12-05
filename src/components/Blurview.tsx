import { StyleSheet, Text, View } from 'react-native'
import { BlurView } from "expo-blur";
import React from 'react'

const Blurview = () => {
  return (
    <View>
    <BlurView 
  intensity={25} 
  tint="light" 
  style={styles.glassContainer} // Apply border radius here
>
  <View style={styles.glassContent}> 
     {/* Your Icons and Text go here */}
     <Text style={styles.glassText}>Glass Button</Text>
  </View>
</BlurView>
    </View>
  )
}

export default Blurview






const styles = StyleSheet.create({
 
  glassContainer: {
    borderRadius: 20, 
    overflow: 'hidden', 
  },


  glassContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  

  glassText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  }
});
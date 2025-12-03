import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { HomeSvg } from "@/assets/svg/homeIcon";
import { EscrowSvg } from "@/assets/svg/escrowSvg";
import { SettingsSvg } from "@/assets/svg/settingsSvg";
import { TransactionSvg } from "@/assets/svg/transactionSvg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#053",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarLabelStyle: {
          fontFamily: "Poppins-Medium",
          fontSize: 11,
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
        tabBarIcon: ({ color, focused }) => {
          let SvgComponent;

          switch (route.name) {
            case "Home":
              SvgComponent = HomeSvg;
              break;
            case "Escrow":
              SvgComponent = EscrowSvg;
              break;
            case "Saved":
              SvgComponent = TransactionSvg;
              break;
            case "Profile":
              SvgComponent = SettingsSvg;
              break;
            default:
              SvgComponent = HomeSvg;
          }

          return (
            <View
              style={{
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -10,
                    width: 6,
                    height: 6,
                    borderRadius: 30,
                    backgroundColor: "#053",
                  }}
                />
              )}
              <SvgComponent color={color} />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="Home" options={{ title: "Home" }} />
      <Tabs.Screen name="Escrow" options={{ title: "Escrow" }} />
      <Tabs.Screen name="Saved" options={{ title: "Transactions" }} />
      <Tabs.Screen name="Profile" options={{ title: "Settings" }} />
    </Tabs>
  );
}
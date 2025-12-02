
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
        tabBarActiveTintColor: "#053014",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarLabelStyle: {
          fontFamily: "Poppins-Medium",
          fontSize: 11,
        },
        tabBarIcon: ({ color }) => {
          let SvgComponent;

          switch (route.name) {
            case "Home":
              SvgComponent = HomeSvg;
              break;
            case "Discover":
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
              <SvgComponent color={color} />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="Home" options={{ title: "Home" }} />
      <Tabs.Screen name="Discover" options={{ title: "Escrow" }} />
      <Tabs.Screen name="Saved" options={{ title: "Transactions" }} />
      <Tabs.Screen name="Profile" options={{ title: "Settings" }} />
    </Tabs>
  );
}

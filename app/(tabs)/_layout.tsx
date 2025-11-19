import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';


import { HomeSvg, HomeOutlineSvg } from '../../assets/svg/homeIcon';

import {
  ProfileSvg,
  ProfileOutlineSvg,
} from '../../assets/svg/profileIcon';


import {
  BookmarkSvg,
  BookmarkOutlineSvg,
} from '../../assets/svg/bookMark';

import {
  DiscoverSvg,
  DiscoverOutlineSvg,
} from '../../assets/svg/discoverIcon';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#124E9B',
        tabBarInactiveTintColor: '#8E8E93',

        tabBarLabelStyle: {
          fontFamily: 'semibold',
          fontSize: 11,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let ActiveSvgComponent;
          let InactiveSvgComponent;

          switch (route.name) {
            case 'Home':
              ActiveSvgComponent = HomeSvg;
              InactiveSvgComponent = HomeOutlineSvg;
              break;
            case 'Discover':
              ActiveSvgComponent = DiscoverSvg;
              InactiveSvgComponent = DiscoverOutlineSvg;
              break;
            case 'Saved':
              ActiveSvgComponent = BookmarkSvg;
              InactiveSvgComponent = BookmarkOutlineSvg;
              break;

            case 'Profile':
              ActiveSvgComponent = ProfileSvg;
              InactiveSvgComponent = ProfileOutlineSvg;
              break;
            default:
              ActiveSvgComponent = HomeSvg;
              InactiveSvgComponent = HomeOutlineSvg;
          }

          const SvgComponent = focused ? ActiveSvgComponent : InactiveSvgComponent;

          return (
            <View style={{
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            }}>


              <SvgComponent
                width={23}
                height={23}
                fill={color}
                color={color}
                style={{
                  tintColor: color,
                }}
              />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
        }}
      />

      <Tabs.Screen
        name="Discover"
        options={{
          title: 'Discover',
        }}
      />

      <Tabs.Screen
        name="Saved"
        options={{
          title: 'Saved',
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
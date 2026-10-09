import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { JobScreen } from '../screens/JobScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ApiListScreen } from '../screens/ApiListScreen';
import { colors } from '../theme/colors';
export type RootStackParams = { MainTabs: undefined; Job: undefined; ApiList: undefined };
const Stack = createNativeStackNavigator<RootStackParams>();
const Tabs = createBottomTabNavigator();
function MainTabs() { return <Tabs.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: colors.panel, borderTopColor: colors.border, height: 62, paddingTop: 7, paddingBottom: 7 }, tabBarActiveTintColor: colors.pink, tabBarInactiveTintColor: colors.muted, tabBarLabelStyle: { fontSize: 11, fontWeight: '700' } }}><Tabs.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'HOME', tabBarIcon: () => null }} /><Tabs.Screen name="History" component={HistoryScreen} options={{ tabBarLabel: 'HISTORY', tabBarIcon: () => null }} /><Tabs.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'SETTINGS', tabBarIcon: () => null }} /></Tabs.Navigator>; }
export function RootNavigator() { return <NavigationContainer theme={{ ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.bg, card: colors.panel, text: colors.text, border: colors.border, primary: colors.pink } }}><Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.bg }, headerTintColor: colors.text, headerTitleStyle: { fontWeight: '800' }, contentStyle: { backgroundColor: colors.bg }, animation: 'fade_from_bottom' }}><Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} /><Stack.Screen name="Job" component={JobScreen} options={{ title: 'Simulation console' }} /><Stack.Screen name="ApiList" component={ApiListScreen} options={{ title: 'Mock registry' }} /></Stack.Navigator></NavigationContainer>; }

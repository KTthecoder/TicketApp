import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { AntDesign } from '@expo/vector-icons'; 
import SearchScreen from '../screens/SearchScreen'
import MyTicketsScreen from '../screens/MyTicketsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {
        height: Platform.OS === 'ios' ? 87 : 55,
        borderTopWidth: 0,
        position: 'absolute',
        shadowOpacity: 0,
        elevation: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0c0f15'
    }}}>
        <Tab.Screen name='HomeScreen' component={HomeScreen} options={{
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
                <AntDesign name="home" size={size} color={focused ? 'white' : 'gray'} />
            ),
            tabBarLabelStyle: {paddingBottom: 5},
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            title: 'Home',
        }} />
        <Tab.Screen name='Search' component={SearchScreen} options={{
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
                <Feather name="search" size={size} color={focused ? 'white' : 'gray'}  />
            ),
            tabBarLabelStyle: {paddingBottom: 5},
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            title: 'Search',
        }} />
        <Tab.Screen name='MyTicketsScreen' component={MyTicketsScreen} options={{
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
                <MaterialCommunityIcons name="ticket-confirmation-outline" size={size} color={focused ? 'white' : 'gray'} />
            ),
            tabBarLabelStyle: {paddingBottom: 5},
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            title: 'My Tickets',
        }} />
        <Tab.Screen name='ProfileScreen' component={ProfileScreen} options={{
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
                <Feather name="user" size={size} color={focused ? 'white' : 'gray'}  />
            ),
            tabBarLabelStyle: {paddingBottom: 5},
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            title: 'Profile',
        }} />
    </Tab.Navigator>
  )
}

export default TabNav
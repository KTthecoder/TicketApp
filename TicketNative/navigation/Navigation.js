import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import TabNav from './TabNav'
import { AuthContext } from '../contexts/AuthContext'
import ArtistScreen from '../screens/ArtistScreen'
import EventScreen from '../screens/EventScreen'
import MyTicketDetailsScreen from '../screens/MyTicketDetailsScreen'
import ByCategoryScreen from '../screens/ByCategoryScreen'
import RowByCategoryScreen from '../screens/RowByCategoryScreen'
import EditProfileInfoScreen from '../screens/EditProfileInfoScreen'
import RegisterScreen from '../screens/RegisterScreen'
import AllFollowedArtistsScreen from '../screens/AllFollowedArtistsScreen'
import AllFollowedEventsScreen from '../screens/AllFollowedEventsScreen'
import TicketCheckoutScreen from '../screens/TicketCheckoutScreen'
import CartScreen from '../screens/CartScreen'
import AllRecommendedEventsScreen from '../screens/AllRecommendedEventsScreen'
import AllLocationEventsScreen from '../screens/AllLocationEventsScreen'

const Stack = createNativeStackNavigator()

const Navigation = () => {
    const { isLoading, refreshToken } = useContext(AuthContext)

    if(isLoading){
        return(
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' />
          </View>
        )
    }
    
    return (
        <Stack.Navigator>
            {refreshToken === null ? (
                <>
                    <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}} /> 
                    <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{headerShown: false}} /> 
                </>     
            ) : (
                <>
                    <Stack.Screen name='TabNav' component={TabNav} options={{headerShown: false, presentation: 'fullScreenModal', animation: 'fade'}}/> 
                    <Stack.Screen name='ArtistScreen' component={ArtistScreen} options={{headerShown: false}}/> 
                    <Stack.Screen name='EventScreen' component={EventScreen} options={{headerShown: false}}/> 
                    <Stack.Screen name='MyTicketDetailsScreen' component={MyTicketDetailsScreen} options={{headerShown: false}}/> 
                    <Stack.Screen name='ByCategoryScreen' component={ByCategoryScreen} options={{headerShown: false}}/> 
                    <Stack.Screen name='RowByCategoryScreen' component={RowByCategoryScreen} options={{headerShown: false}}/> 
                    <Stack.Screen name='EditProfileInfoScreen' component={EditProfileInfoScreen} options={{headerShown: false}}/> 
                    <Stack.Screen name='AllFollowedArtistsScreen' component={AllFollowedArtistsScreen} options={{headerShown: false}}/> 
                    <Stack.Screen name='AllFollowedEventsScreen' component={AllFollowedEventsScreen} options={{headerShown: false}}/> 
                    <Stack.Screen name='TicketCheckoutScreen' component={TicketCheckoutScreen} options={{headerShown: false}}/> 
                    <Stack.Screen name='CartScreen' component={CartScreen} options={{headerShown: false}}/> 
                    <Stack.Screen name='AllRecommendedEventsScreen' component={AllRecommendedEventsScreen} options={{headerShown: false}}/> 
                    <Stack.Screen name='AllLocationEventsScreen' component={AllLocationEventsScreen} options={{headerShown: false}}/> 
                </>           
            )}    
            
            
        </Stack.Navigator>
    )
}

export default Navigation
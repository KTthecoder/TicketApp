import { View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import useFetchGet from '../hooks/useFetchGet';

const MyTicketDetailsScreen = () => {
  const { width, height } = Dimensions.get('screen')
  const navigation = useNavigation()
  const route = useRoute()

  const { data, isLoading, setChange, change } = useFetchGet(`http://192.168.1.34:8000/api/my-tickets/${route.params.id}`)

  if (isLoading){
    return (
      <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
        <ActivityIndicator size='large' />
      </View>
    )
  }
  
  return (
    <SafeAreaView className='items-center w-screen bg-[#0c0f15] flex-1'>
      <View className='justify-between items-center flex-row pb-3' style={{width: width * 0.94}}>
        <View className='flex-row items-center justify-between' style={{width: width * 0.94}}>
          <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
          <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>My Ticket</Text>
          <TouchableOpacity className='pl-2 py-2' style={{opacity: 0}}>
            <AntDesign name="search1" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 50}}>
        <View className='items-center justify-center mt-5'>
          <Image source={require('../assets/qr1.png')} className='rounded-xl' style={{width: width * 0.94, height: width * 0.94}}/>
          <View className='items-center justify-between flex-row mt-4 bg-[#141923] py-4 rounded-xl' style={{width: width * 0.94}}>
            <View className='items-start pl-3' style={{width: '50%'}}>
              <Text className='text-white text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>#{data && data['Ticket']['id']}</Text>
              <Text className='text-blue-500 text-sm' style={{fontFamily: 'Montserrat-Medium'}}>Ticket Id</Text>
            </View>
            <View className='items-end pr-3' style={{width: '50%'}}>
              <Text className='text-white text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['Ticket']['quantity']}</Text>
              <Text className='text-blue-500 text-sm' style={{fontFamily: 'Montserrat-Medium'}}>Number Of Tickets</Text>
            </View>
          </View>

          <View className='items-center justify-between flex-row mt-5 bg-[#141923] py-4 rounded-xl' style={{width: width * 0.94}}>
            <View className='items-start pl-3' style={{width: '100%'}}>
              <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['Ticket']['user']['first_name']} {data && data['Ticket']['user']['last_name']}</Text>
              <Text className='text-blue-500 text-sm' style={{fontFamily: 'Montserrat-Medium'}}>First and Last Name</Text>
              <View className='items-start mt-5' style={{width: '100%'}}>
                <Text onPress={() => navigation.navigate('EventScreen')} className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['Ticket']['ticket']['event']['name']}</Text>
              </View>
              <View className='mt-5 flex-row items-center'>
                <AntDesign name="calendar" size={24} color="white" />
                <Text className='text-white text-sm ml-2' style={{fontFamily: 'Montserrat-Medium'}}>{data && data['Ticket']['ticket']['event']['eventStartDate'].substring(0,10)}</Text>
              </View>
              <View className='mt-3 flex-row items-center'>
                <AntDesign name="clockcircleo" size={24} color="white" />
                <Text className='text-white text-sm ml-2' style={{fontFamily: 'Montserrat-Medium'}}>{data && data['Ticket']['ticket']['event']['eventStartDate'].substring(11,16)}</Text>
              </View>
              <View className='mt-3 flex-row items-center'>
              <Ionicons name="location-outline" size={24} color="white" />
                <Text className='text-white text-sm ml-2' style={{fontFamily: 'Montserrat-Medium'}}>{data && data['Ticket']['ticket']['event']['localization']}</Text>
              </View>
              
            </View>
          </View>

          <View className='items-center justify-between flex-row mt-5 bg-[#141923] py-4 rounded-xl' style={{width: width * 0.94}}>
            <View className='items-start pl-3' style={{width: '50%'}}>
              <Text className='text-white text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>Total Price</Text>
            </View>
            <View className='items-end pr-3' style={{width: '50%'}}>
              <Text className='text-white text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>${data && data['Ticket']['item_total']}</Text>
            </View>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MyTicketDetailsScreen
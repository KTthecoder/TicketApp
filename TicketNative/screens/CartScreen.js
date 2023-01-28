import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import CartBlock from '../components/CartBlock';
import useFetchGet from '../hooks/useFetchGet';

const CartScreen = () => {
  const { width } = Dimensions.get('screen')
  const navigation = useNavigation()

  const { data, isLoading, setChange, change } = useFetchGet('http://192.168.1.34:8000/api/cart')

  if (isLoading){
    return (
      <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <SafeAreaView className='w-screen justify-start items-center bg-[#0c0f15] flex-1'>
      <View className='justify-between items-center flex-row pb-3' style={{width: width * 0.94}}>
        <View className='flex-row items-center justify-between' style={{width: width * 0.94}}>
          <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
          <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Cart</Text>
          <TouchableOpacity className='pl-2 py-2' style={{opacity: 0}}>
              <AntDesign name="search1" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className='absolute bottom-16' style={{zIndex: 1, width: width * 0.94}}>
        <TouchableOpacity style={{width: '100%', zIndex: 1}} onPress={() => {navigation.navigate('TicketCheckoutScreen')}} className='justify-center items-center bg-blue-500 pt-4 pb-4 rounded-md mt-9'>
          <Text className='text-white text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>Go To Checkout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data && data['Response'] != "Your Shopping Cart is Empty" ? data['OrderItems'].map((item) => (
          <CartBlock setChange={setChange} change={change} orderItemId={item.id} ticketId={item.ticket.id} key={item.id} eventName={item.ticket.event.name} name={item.ticket.name} quantity={item.quantity} itemTotal={item['item_total']} />
        )) : <Text className='text-white text-lg text-center mt-2' style={{fontFamily: 'Montserrat-SemiBold', width: width * 0.94}}>Your Cart Is Empty</Text>}
        {data && data['Response'] != "Your Shopping Cart is Empty" ? 
          <View className='flex-row justify-between items-center bg-[#141923] px-4 rounded-xl py-4 mt-5' style={{width: width * 0.94}}>
            <Text className='text-white text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>Sub Total: </Text>
            <Text className='text-blue-500 text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>${data && data['OrderTotal']}</Text>
          </View> 
        : null}
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default CartScreen
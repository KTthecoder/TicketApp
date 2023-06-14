import { View, Text, Dimensions } from 'react-native'
import React from 'react'

const CartBlockCheckout = ({quantity, eventName, ticketName, itemTotal}) => {
    const { width } = Dimensions.get('screen')

    return (
        <View className='flex-row justify-between items-center bg-[#141923] rounded-xl pl-5 mt-5' style={{width: width * 0.94, height: 120}}>
            <View className='py-5' style={{width: '80%'}}>
                <Text className='text-white text-base' numberOfLines={2} style={{fontFamily: 'Montserrat-Medium'}}>
                    <Text className='text-blue-500 text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>{quantity}x </Text> 
                        {eventName} ({ticketName})</Text>
                <Text className='text-blue-500 text-base mt-3' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold'}}>${itemTotal}</Text>
            </View>
            <View className='bg-[#181e2a] rounded-r-xl items-center justify-center' style={{width: '20%', height: '100%'}}>
                <View className='bg-gray-600 my-1 rounded-sm' style={{width: '60%', height: 4}}></View>
                <View className='bg-gray-600 my-2 rounded-sm' style={{width: '60%', height: 4}}></View>
                <View className='bg-gray-600 my-1 rounded-sm' style={{width: '60%', height: 4}}></View>
            </View>
        </View>
    )
}

export default CartBlockCheckout
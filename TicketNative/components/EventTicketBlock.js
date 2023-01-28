import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from "expo-secure-store"

const EventTicketBlock = ({title, price, ticketId}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    async function AddProduct() {
        await SecureStore.getItemAsync("accessToken").then(async(token) => {
            fetch(`http://192.168.1.34:8000/api/cart/add/${ticketId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
            })
            .then(res => res.json())
            .then((data) => {
                navigation.navigate('CartScreen')
            })
            .catch(err => {
                console.log(err.message)
            })
        })
    }

    return (
        <View className='bg-[#141923] rounded-xl items-center py-4 mb-5' style={{width: '100%'}}>
            <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-Medium', width: '90%', lineHeight: 30}}>{title}</Text>
            <View className='items-center flex-row justify-between mt-2' style={{width: '90%'}}>
                <Text className='text-gray-200 text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>Price {price}$</Text>
                <TouchableOpacity onPress={() => AddProduct()} className='bg-blue-500 rounded-xl items-center justify-center' style={{width: 130}}>
                    <Text className='text-white py-3' style={{fontFamily: 'Montserrat-Medium'}}>Buy Ticket</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EventTicketBlock
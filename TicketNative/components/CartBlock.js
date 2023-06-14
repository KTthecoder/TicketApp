import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store"

const CartBlock = ({name, quantity, itemTotal, eventName, ticketId, setChange, change, orderItemId}) => {
    const { width } = Dimensions.get('screen')

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
                setChange(!change)
                console.log(data)
            })
            .catch(err => {
                console.log(err.message)
            })
        })
    }

    async function RemoveProduct() {
        await SecureStore.getItemAsync("accessToken").then(async(token) => {
            fetch(`http://192.168.1.34:8000/api/cart/remove/${orderItemId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
            })
            .then(res => res.json())
            .then((data) => {
                setChange(!change)
                console.log(data)
            })
            .catch(err => {
                console.log(err.message)
            })
        })
    }

    async function RemoveProductPer() {
        await SecureStore.getItemAsync("accessToken").then(async(token) => {
            fetch(`http://192.168.1.34:8000/api/cart/remove-per/${orderItemId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
            })
            .then(res => res.json())
            .then((data) => {
                setChange(!change)
                console.log(data)
            })
            .catch(err => {
                console.log(err.message)
            })
        })
    }

    return (
        <View className='flex-row justify-between items-center bg-[#141923] rounded-xl px-5 py-5 mt-5' style={{width: width * 0.94}}>
            <View className='' style={{width: '85%'}}>
                <Text className='text-white text-base' numberOfLines={2} style={{fontFamily: 'Montserrat-SemiBold'}}>{eventName} - {name}</Text>
                <View className='flex-row items-center my-2'>
                <TouchableOpacity onPress={() => AddProduct()}>
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
                <Text className='text-white text-base mx-4' style={{fontFamily: 'Montserrat-SemiBold'}}>{quantity}</Text>
                <TouchableOpacity onPress={() => RemoveProduct()}>
                    <AntDesign name="minus" size={24} color="white" />
                </TouchableOpacity>
                </View>
                <Text className='text-blue-500 text-base mt-1' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold'}}>${itemTotal}</Text>
            </View>
            <TouchableOpacity className='pl-4 py-4 items-end' style={{width: '15%'}} onPress={() => RemoveProductPer()}>
                <FontAwesome5 name="trash-alt" size={22} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default CartBlock
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Formik } from 'formik'
import KeyboardAvoidWrapper from '../components/KeyboardAvoidWrapper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { AntDesign } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import useFetchGet from '../hooks/useFetchGet';
import * as SecureStore from "expo-secure-store"

const EditProfileInfoScreen = () => {
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const navigation = useNavigation()
    const { width, height } = Dimensions.get('screen')

    const { data, isLoading, setChange, change } = useFetchGet(`http://192.168.1.34:8000/api/user/info`)

    async function EditUserInfo(items) {
        await SecureStore.getItemAsync("accessToken").then(async(token) => {
            fetch(`http://192.168.1.34:8000/api/user/info/post`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify({
                    email: items.email,
                    first_name: items.name,
                    last_name: items.lastName,
                    location: items.location,
                    username: items.username
                })
            })
            .then(res => res.json())
            .then((data) => {
                // navigation.navigate('TabNav', {screen: 'ProfileScreen'})
                setChange(!change)
                console.log(data)
            })
            .catch(err => {
                console.log(err.message)
            })
        })
    }

    let [fontsLoaded] = useFonts({
        'Montserrat-Regular' : require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold' : require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium' : require('../assets/fonts/Montserrat-Medium.ttf'),
    })

    if (!fontsLoaded){
        return <ActivityIndicator size='large' />
    }

    if (isLoading){
        return (
            <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
                <ActivityIndicator size='large' />
            </View>
        )
    }
    
    return (
        <>
            <SafeAreaView className='items-center bg-[#0c0f15]'>
                <View className='justify-between items-center flex-row pb-3' style={{width: width * 0.94}}>
                    <View className='flex-row items-center justify-between' style={{width: width * 0.94}}>
                        <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={24} color="white" />
                        </TouchableOpacity>
                        <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Edit Profile</Text>
                        <TouchableOpacity className='pl-2 py-2' style={{opacity: 0}}>
                            <AntDesign name="search1" size={25} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
           
            <KeyboardAvoidWrapper>
                <>
                <SafeAreaView className='items-center bg-[#0c0f15]'>
                        <View className='bg-[#141923] py-5 px-3 rounded-xl mt-2' style={{width: width * 0.94}}>
                            <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>{data &&  data['User']['first_name']} {data && data['User']['last_name']}</Text>
                            <Text className='text-gray-300 text-base mt-3' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['User']['email']}</Text>
                            <View className='rounded-xl mt-3 flex-row items-center justify-between'>
                                <View className='flex-row items-center'>
                                    <EvilIcons name="location" size={24} color="white" />
                                    <Text className='text-white text-base ml-1' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['User']['location']['location']['name']}</Text>
                                </View>
                                <View className='rounded-xl bg-blue-500 justify-center items-center' style={{width: 90}}>
                                    <Text className='text-white text-sm py-2' style={{fontFamily: 'Montserrat-SemiBold'}}>Edit</Text>
                                </View>
                            </View> 
                        </View>
                    </SafeAreaView>

                    {data && <Formik
                        initialValues={{username: data['User']['username'], name: data['User']['first_name'], lastName: data['User']['last_name'], email: data['User']['email'], location: data['User']['location']['location']['name']}}
                        onSubmit={(values) => EditUserInfo(values)}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                            <View className='justify-start w-screen pl-5 pr-5'>
                                <View className='justify-start w-sceeen flex-row items-center mt-6'>
                                    <View className='justify-center items-center pr-2' style={{marginLeft: -15}}>
                                        <Entypo name="dot-single" size={30} color="gray" />
                                    </View>
                                    <View className='border-b border-gray-400 w-screen flex-1 justify-center'>
                                        <TextInput  
                                            placeholder='Name'
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            value={values.name}
                                            blurOnSubmit={false}
                                            returnKeyType='next'
                                            onSubmitEditing={() => {
                                                ref1.current.focus()
                                            }}
                                            placeholderTextColor={'gray'}
                                            className='text-base pr-4 text-black'
                                            style={{fontFamily: 'Montserrat-Regular', color: 'white', height: 55}}
                                        />
                                    </View>
                                </View>
                                <View className='justify-start w-sceeen flex-row items-center mt-4'>
                                    <View className='justify-center items-center pr-2' style={{marginLeft: -15}}>
                                        <Entypo name="dot-single" size={30} color="gray" />
                                    </View>
                                    <View className='border-b border-gray-400 w-screen flex-1 justify-center'>
                                        <TextInput  
                                            placeholder='Last Name'
                                            onChangeText={handleChange('lastName')}
                                            onBlur={handleBlur('lastName')}
                                            value={values.lastName}
                                            blurOnSubmit={false}
                                            returnKeyType='next'
                                            ref={ref1}
                                            onSubmitEditing={() => {
                                                ref2.current.focus()
                                            }}
                                            placeholderTextColor={'gray'}
                                            className='text-base pr-4 text-black'
                                            style={{fontFamily: 'Montserrat-Regular', color: 'white', height: 55}}
                                        />
                                    </View>
                                </View>
                                <View className='justify-start w-sceeen flex-row items-center mt-4'>
                                    <View className='justify-center items-center pr-2' style={{marginLeft: -15}}>
                                        <Entypo name="dot-single" size={30} color="gray" />
                                    </View>
                                    <View className='border-b border-gray-400 w-screen flex-1 justify-center'>
                                        <TextInput  
                                            placeholder='Email'
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            blurOnSubmit={false}
                                            returnKeyType='next'
                                            ref={ref2}
                                            onSubmitEditing={() => {
                                                ref3.current.focus()
                                            }}
                                            placeholderTextColor={'gray'}
                                            className='text-base pr-4 text-black'
                                            style={{fontFamily: 'Montserrat-Regular', color: 'white', height: 55}}
                                        />
                                    </View>
                                </View>
                                <View className='justify-start w-sceeen flex-row items-center mt-4'>
                                    <View className='justify-center items-start pr-2' style={{marginLeft: -15}}>
                                        <Entypo name="dot-single" size={30} color="gray" />
                                    </View>
                                    <View className='border-b border-gray-400 w-screen flex-1 justify-center'>
                                        <TextInput  
                                            placeholder='Location'
                                            onChangeText={handleChange('location')}
                                            onBlur={handleBlur('location')}
                                            value={values.location}
                                            blurOnSubmit={false}
                                            ref={ref3}
                                            placeholderTextColor={'gray'}
                                            className='text-base pr-4 text-black'
                                            style={{fontFamily: 'Montserrat-Regular', color: 'white', height: 55}}
                                        />
                                    </View>
                                </View>
                                <TouchableOpacity onPress={handleSubmit} className='justify-center items-center bg-blue-500 pt-4 pb-4 rounded-md mt-9'>
                                    <Text className='text-white text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>Edit</Text>
                                </TouchableOpacity>
                            </View>  
                        )}
                    </Formik>}
                </>
            </KeyboardAvoidWrapper>
        </> 
    )
}

export default EditProfileInfoScreen
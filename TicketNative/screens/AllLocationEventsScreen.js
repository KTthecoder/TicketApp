import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import SearchBlock from '../components/SearchBlock';
import useFetchGet from '../hooks/useFetchGet';

const AllLocationEventsScreen = () => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    const { data, isLoading, setChange, change } = useFetchGet(`http://192.168.1.34:8000/api/events/location`)

    if (isLoading){
      return (
        <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return (
      <SafeAreaView className='w-screen justify-center items-center bg-[#0c0f15] flex-1'>
        <View className='justify-between items-center flex-row pb-3' style={{width: width * 0.94}}>
          <View className='flex-row items-center justify-between' style={{width: width * 0.94}}>
            <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>
            <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>In Warsaw</Text>
            <TouchableOpacity className='pl-2 py-2' style={{opacity: 0}}>
              <AntDesign name="search1" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={{justifyContent: 'start', alignItems: 'start', paddingBottom: 50, marginTop: -15}} style={{width: width * 0.94}} showsVerticalScrollIndicator={false}>
          {data['EventsLocation'] && <SearchBlock data={data['EventsLocation']}/>}
        </ScrollView>
      </SafeAreaView>
    )
}

export default AllLocationEventsScreen
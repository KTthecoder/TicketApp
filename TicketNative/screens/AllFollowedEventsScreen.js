import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import useFetchGet from '../hooks/useFetchGet';
import SearchBlock1 from '../components/SearchBlock1';

const AllFollowedEventsScreen = () => {
  const { width } = Dimensions.get('screen')
  const navigation = useNavigation()

  const { data, isLoading, setChange, change } = useFetchGet('http://192.168.1.34:8000/api/followed-events')

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
          <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Followed Events</Text>
          <TouchableOpacity className='pl-2 py-2' style={{opacity: 0}}>
            <AntDesign name="search1" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data['FollowedEvents']}
        showsHorizontalScrollIndicator={false}
        className='mb-7'
        contentContainerStyle={{justifyContent: 'center', alignItems: 'start', marginTop: -10}}
        style={{width: width * 0.94}}
        renderItem={({item}) => (
          <SearchBlock1 data={item}/>
        )}
      />
    </SafeAreaView>
  )
}

export default AllFollowedEventsScreen
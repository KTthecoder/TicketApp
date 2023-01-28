import { View, Text, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import ProfileArtistBlock from '../components/ProfileArtistBlock';
import ProfileEventsRow from '../components/ProfileEventsRow';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext'
import useFetchGet from '../hooks/useFetchGet';

const ProfileScreen = () => {
  const { width } = Dimensions.get('screen')
  const navigation = useNavigation()
  const { logoutUser } = useContext(AuthContext)

  const { data, isLoading, setChange, change } = useFetchGet('http://192.168.1.34:8000/api/profile', true)

  if (isLoading){
    return (
      <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <SafeAreaView className='justify-start items-center bg-[#0c0f15] flex-1'>  
      <View className='justify-between items-center flex-row pb-5 pt-1' style={{width: width * 0.94}}>
        <View className='flex-row items-center justify-center' style={{width: width * 0.94}}>
          <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Your Profile</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        <View className='bg-[#141923] py-5 px-3 rounded-xl mt-2' style={{width: width * 0.94}}>
          <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['Profile']['first_name']} {data && data['Profile']['last_name']}</Text>
          <Text className='text-gray-300 text-base mt-3' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['Profile']['email']}</Text>
          <View className='rounded-xl mt-3 flex-row items-center justify-between'>
            <View className='flex-row items-center'>
              <EvilIcons name="location" size={24} color="white" />
              <Text className='text-white text-base ml-1' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['Profile']['location']['location']['name']}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfileInfoScreen')} className='rounded-xl bg-blue-500 justify-center items-center' style={{width: 90}}>
              <Text className='text-white text-sm py-2' style={{fontFamily: 'Montserrat-SemiBold'}}>Edit</Text>
            </TouchableOpacity>
          </View> 
        </View>

        <View className='mt-8 flex-row items-center justify-between' style={{width: width * 0.94}}>
          <Text className='text-gray-100 text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Followed Artists</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllFollowedArtistsScreen')}>
            <Text className='text-blue-500 text-sm' style={{fontFamily: 'Montserrat-Regular'}}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-7' contentContainerStyle={{justifyContent: 'center', alignItems: 'start'}} style={{width: width * 0.94}}> */}
          <FlatList
            data={data['FollowedArtists']}
            showsHorizontalScrollIndicator={false}
            horizontal
            className='mb-7'
            contentContainerStyle={{justifyContent: 'center', alignItems: 'start'}}
            style={{width: width * 0.94}}
            renderItem={({item}) => (
              <ProfileArtistBlock artists={item['artists']} />
            )}
          />
        {/* </ScrollView> */}

        <ProfileEventsRow data={data['FollowedEvents']}/>

        <TouchableOpacity onPress={() => logoutUser()} className='rounded-xl bg-red-600 justify-center items-center mt-14'>
          <Text className='text-gray-300 text-base py-3' style={{fontFamily: 'Montserrat-SemiBold'}}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
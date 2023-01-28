import { View, Text, SafeAreaView, Dimensions, ActivityIndicator, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font'
import HomeCategories from '../components/HomeCategories'
import Carousel from 'react-native-snap-carousel';
import HomeVrow from '../components/HomeVrow';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import useFetchGet from '../hooks/useFetchGet';

const HomeScreen = () => {
  const { width, height } = Dimensions.get('screen')
  const navigation = useNavigation()

  const { data, isLoading, setChange, change } = useFetchGet('http://192.168.1.34:8000/api/home')

  let [fontsLoaded] = useFonts({
    'Montserrat-Regular' : require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold' : require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Medium' : require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-ExtraBold' : require('../assets/fonts/Montserrat-ExtraBold.ttf'),
  })

  if (!fontsLoaded){
    return (
      <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
        <ActivityIndicator size='large' />
      </View>
    )
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
      <SafeAreaView className='items-center w-screen bg-[#0c0f15]'>
        <View className='justify-between items-center flex-row pb-3' style={{width: width * 0.94}}>
          <View className='flex-row items-center justify-between' style={{width: width * 0.94}}>
            <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Ticket<Text className='text-blue-500'>App</Text></Text>
            <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} className='pl-2 py-2'>
              <Feather name="shopping-bag" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView className='items-center w-screen bg-[#0c0f15] flex-1'>
        <ScrollView className='mt-2' showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 110}}>
          <Carousel
            layout={"default"}
            data={data['EventsHorizontal']}
            sliderWidth={width * 0.95}
            itemWidth={width * 0.87}
            activeSlideAlignment='start'
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => navigation.navigate('EventScreen', {slug: item.slug})} key={item.id} className='relative rounded-xl' style={{width: width * 0.87, backgroundColor: '#141923'}}>
                <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${item.bannerHorizontalImg}`}} className='rounded-xl' style={{width: width * 0.87, height: width * 0.55}} />
                <View className='absolute bottom-3 left-3' style={{zIndex: 1, width: '100%'}}>
                  <Text className='text-white text-xs' style={{fontFamily: 'Montserrat-Medium'}}>{item['eventStartDate'].substring(0,10)}</Text>
                  <Text className='text-white text-base mt-1' numberOfLines={2} style={{fontFamily: 'Montserrat-ExtraBold'}}>{item.name}</Text>
                </View>
                <View className='absolute bottom-0' style={{width: '100%', height: '35%', backgroundColor: 'rgba(0, 0, 0, 0.505)'}}></View>
              </TouchableOpacity>
            )}
          />
          <View className='mt-6 flex-row items-center justify-between mb-4' style={{width: width * 0.94}}>
            <Text className='text-gray-100 text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Categories</Text>
          </View>
          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center', alignItems: 'start'}} style={{width: width * 0.94}}> */}
            <FlatList
              horizontal
              data={data['Categories']}
              renderItem={({item}) => (
                <HomeCategories id={item['id']} title={item['name']} slug={item['slug']} bgColor={item['bgColor']} tintColor={item['tintColor']}/>
              )}
              contentContainerStyle={{justifyContent: 'center', alignItems: 'start'}}
              showsHorizontalScrollIndicator={false}
              style={{width: width * 0.94}}
            />
          {/* </ScrollView> */}

          <HomeVrow data={data['RecommendedEvents']} category='recomended' title='Recomended' row={false}/>

          <HomeVrow data={data['EventsLocation']} category='in-warsaw' title='In Warsaw' row={false}/>

          <HomeVrow data={data['EventsFestivals']} category='festival' title='Festivals' row={true}/>

        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default HomeScreen
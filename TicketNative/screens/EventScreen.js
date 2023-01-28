import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import ProfileArtistBlock from '../components/ProfileArtistBlock';
import EventTicketBlock from '../components/EventTicketBlock';
import useFetchGet from '../hooks/useFetchGet';

const EventScreen = () => {
    const { width, height } = Dimensions.get('screen')
    const navigation = useNavigation()
    const [show, setShow] = useState(false)
    const route = useRoute()

    const { data, isLoading, setChange, change } = useFetchGet(`http://192.168.1.34:8000/api/event/details/${route.params.slug}`)

    if (isLoading){
        return (
            <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
                <ActivityIndicator size='large' />
            </View>
        )
    }
  
    return (
        <View className='items-center w-screen bg-[#0c0f15] flex-1'>
            <View className='justify-between items-center flex-row pb-2 absolute top-12' style={{width: width * 0.94, zIndex: 1}}>
                <View className='flex-row items-center justify-center rounded-full' style={{width: 40, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.665)'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 110}}>
                <View className='relative'>
                    {/* <View className='absolute' style={{width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.455)', zIndex: 1}}></View> */}
                    <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${data['Event']['bannerHorizontalImg']}`}} style={{width: width, height: 260}} />
                </View>
                <View className='justify-center items-center mt-5' style={{width: '100%', zIndex: 1}}>
                    <Text className='text-white text-2xl' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold', width: width * 0.94}}>{data && data['Event']['name']}</Text>
                    <View className='flex-row justify-start items-center' style={{ width: width * 0.94}}>
                        <View className='flex-row items-center mt-3 mr-4'>
                            <AntDesign name="calendar" size={20} color="#ddd" />
                            <Text className='text-[#ddd] text-sm ml-2' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['Event']['eventStartDate'].substring(0,10)} - {data && data['Event']['eventFinishDate'].substring(0,10)}</Text>
                        </View>
                        <View className='flex-row items-center mt-3'>
                            <Feather name="clock" size={20} color="#ddd" />
                            <Text className='text-[#ddd] text-sm ml-2' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['Event']['eventStartDate'].substring(11,16)}</Text>
                        </View>
                    </View>
                    <View className='flex-row mt-3' style={{width: width * 0.94, marginLeft: -3}}>
                        <Ionicons name="location-outline" size={20} color="white" />
                        <Text className='text-[#ddd] text-sm ml-2' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['Event']['localization']}</Text>
                    </View>
                    <View className='mt-3' style={{width: width * 0.94}}>
                        <Text className='text-blue-500 text-base mb-5 mt-4' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold'}}>Description</Text>
                        
                        {show && show ? (
                            <>
                                <Text className='text-gray-200 text-base' style={{fontFamily: 'Montserrat-Regular'}}>{data && data['Event']['description']}</Text>
                                <Text onPress={() => setShow(false)} className='text-blue-500 text-sm mt-1' style={{fontFamily: 'Montserrat-Medium'}}>Show Less</Text>
                            </>
                        ) : (
                            <>
                                <Text className='text-gray-200 text-base mb-2' numberOfLines={4} style={{fontFamily: 'Montserrat-Regular'}}>{data && data['Event']['description']}</Text>
                                <Text onPress={() => setShow(true)} className='text-blue-500 text-sm mt-1' style={{fontFamily: 'Montserrat-Medium'}}>Show More</Text>
                            </>
                        )}
                    </View>

                    <View className='mt-3' style={{width: width * 0.94}}>
                        <Text className='text-blue-500 text-base mt-4' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold'}}>Artists On Event</Text>
                    </View>

                    <FlatList
                        data={data['ArtistsOnEvent']}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{justifyContent: 'center', alignItems: 'start'}} 
                        style={{width: width * 0.94}}
                        renderItem={(({item}) => (
                            <ProfileArtistBlock artists={item['artist']}/>
                        ))}
                    />

                    <View className='' style={{width: width * 0.94}}>
                        <Text className='text-blue-500 text-base mb-5 mt-10' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold'}}>Buy Tickets</Text>
                    </View>
                    <View className='justify-center items-center' style={{width: width * 0.94}}>
                        {data && data['Tickets'].map((item) => (
                            item.quantity == 0 ? '' : <EventTicketBlock title={item.name} price={item.price} key={item.id} ticketId={item.id}/>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default EventScreen
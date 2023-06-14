import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import Carousel from 'react-native-snap-carousel';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import useFetchGet from '../hooks/useFetchGet';

const ArtistScreen = () => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()
    const [show, setShow] = useState(false)
    const route = useRoute()

    const { data } = useFetchGet(`http://192.168.1.34:8000/api/artist/${route.params.slug}`)
  
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
                    <View className='absolute' style={{width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.250)', zIndex: 1}}></View>
                    <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${data && data['Artist']['profileImage']}`}}style={{width: width, height: 300}} />
                    <View className='absolute bottom-5 justify-center items-center' style={{width: '100%', zIndex: 1}}>
                        <Text className='text-white text-4xl' numberOfLines={2} style={{fontFamily: 'Montserrat-SemiBold', zIndex: 1, width: width * 0.94}}>{data && data['Artist']['name']}</Text>
                    </View>
                </View>
                <View className='flex-1 items-center' style={{backgroundColor: 'rgba(12, 15, 21, 0.465)', width: width}}>
                    <View className='justify-center mt-5' style={{width: width * 0.94}}>
                        <View className='items-start justify-between'>
                            <View className='flex-row'>
                                <View className='justify-center items-center mr-5'>
                                    <Text className='text-white text-sm mb-1' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold', zIndex: 1, fontSize: 15}}>{data && data['EventsCount']}</Text>
                                    <Text className='text-gray-300 text-sm' numberOfLines={1} style={{fontFamily: 'Montserrat-Medium', zIndex: 1}}>Concerts</Text>
                                </View>
                                <View className='justify-center items-center mr-5'>
                                    <Text className='text-white text-sm mb-1' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold', zIndex: 1, fontSize: 15}}>78</Text>
                                    <Text className='text-gray-300 text-sm' numberOfLines={1} style={{fontFamily: 'Montserrat-Medium', zIndex: 1}}>Followers</Text>
                                </View>
                            </View> 
                            
                            <TouchableOpacity className='bg-blue-500 mt-7 justify-center items-center rounded-xl py-2' style={{width: 110}}>
                                <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-Medium'}}>Follow</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='mt-5'>
                            <Text className='text-blue-500 text-xl mt-2 mb-5' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold', zIndex: 1}}>About Artist</Text>
                            {show && show ? (
                                <>
                                    <Text className='text-gray-200 text-base mb-2' style={{fontFamily: 'Montserrat-Regular'}}>{data && data['Artist']['description']}</Text>
                                    <Text onPress={() => setShow(false)} className='text-blue-500 text-sm mt-1' style={{fontFamily: 'Montserrat-Medium'}}>Show Less</Text>
                                </>
                            ) : (
                                <>
                                    <Text className='text-gray-200 text-base mb-2' numberOfLines={4} style={{fontFamily: 'Montserrat-Regular'}}>{data && data['Artist']['description']}</Text>
                                    <Text onPress={() => setShow(true)} className='text-blue-500 text-sm mt-1' style={{fontFamily: 'Montserrat-Medium'}}>Show More</Text>
                                </>
                            )}
                        </View>

                        <Text className='text-blue-500 text-xl mt-10' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold', zIndex: 1}}>Next Events</Text>

                        {data && <Carousel
                            layout={"default"}
                            data={data && data['Events']}
                            sliderWidth={width * 0.95}
                            itemWidth={width * 0.80}
                            activeSlideAlignment='start'
                            renderItem={({item}) => (
                                <View key={item.id} className='bg-[#131821] rounded-xl mt-8 justify-center items-center' style={{width: width * 0.80}}>
                                    <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${item['events']['bannerHorizontalImg']}`}} className='rounded-xl' style={{width: '100%', height: 200}} />
                                    <View className='py-5' style={{width: '92%'}}>
                                        <View className='justify-center items-start'>
                                            <View className='bg-blue-500 py-1 px-3 rounded-lg justify-center items-center'>
                                                <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-Regular'}}>{item && item['events']['category']['name']}</Text>
                                            </View>
                                        </View>
                                        <Text className='text-gray-400 text-sm mt-4' style={{fontFamily: 'Montserrat-Medium'}}>{item && item['events']['eventStartDate'].substring(0,10)}</Text>
                                        <Text className='text-white text-xl mt-2' style={{fontFamily: 'Montserrat-SemiBold'}}>{item && item['events']['name']}</Text>
                                        <View className='flex-row items-center mt-3' style={{marginLeft: -5}}>
                                            <EvilIcons name="location" size={19} color="white" />
                                            <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-Medium'}}>{item && item['events']['localization']}</Text>
                                        </View>
                                        <Text className='text-gray-400 text-sm mt-3' style={{fontFamily: 'Montserrat-Medium'}}>Starts From 22$</Text>
                                        <TouchableOpacity onPress={() => navigation.push('EventScreen', {slug: item['events']['slug']})} className='bg-blue-500 rounded-xl justify-center items-center mt-5' style={{height: 50}}>
                                            <Text className='text-white text-base text-center' style={{fontFamily: 'Montserrat-Medium'}}>Buy Ticket</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                            )}
                        />}
                    </View>
                </View>
                <View className='mt-1' style={{width: width * 0.94}}>
                    <Text className='text-blue-500 text-xl mt-10' numberOfLines={1} style={{fontFamily: 'Montserrat-SemiBold', zIndex: 1}}>Socials</Text>
                </View>
                <View className='bg-[#131821] rounded-xl flex-row justify-between mt-5 py-5 px-3' style={{width: width * 0.94}}>
                    <TouchableOpacity className='items-center justify-center' style={{width: 80, height: 50}}>
                        <Entypo name="instagram" size={28} color="white" />
                        <Text className='text-white text-sm mt-1' style={{fontFamily: 'Montserrat-Medium'}}>Instagram</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='items-center justify-center' style={{width: 80, height: 50}}>
                        <Entypo name="spotify" size={32} color="white" />
                        <Text className='text-white text-sm mt-1' style={{fontFamily: 'Montserrat-Medium'}}>Spotify</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='items-center justify-center' style={{width: 80, height: 50}}>
                        <Entypo name="facebook" size={28} color="white" />
                        <Text className='text-white text-sm mt-1' style={{fontFamily: 'Montserrat-Medium'}}>Facebook</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default ArtistScreen
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

const ProfileEventsRow = ({data}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <>
            <View className='mt-4 flex-row items-center justify-between' style={{width: width * 0.94}}>
                <Text className='text-gray-100 text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Followed Events</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AllFollowedEventsScreen')}>
                    <Text className='text-blue-500 text-sm' style={{fontFamily: 'Montserrat-Regular'}}>See all</Text>
                </TouchableOpacity>
            </View>
            <Carousel
                layout={"default"}
                data={data}
                sliderWidth={width * 0.94}
                itemWidth={255}
                activeSlideAlignment='start'
                slideStyle={{justifyContent: 'flex-start', alignItems: 'flex-start'}}
                renderItem={({item}) => (
                    item['events'].map((value) => (
                        <TouchableOpacity onPress={() => navigation.navigate('EventScreen', {slug: value.slug})} key={item.id} className='relative rounded-xl mt-7' style={{width: 250, backgroundColor: '#141923'}}>
                            <Image source={require('../assets/vertical.jpg')} className='rounded-xl' style={{width: 250, height: 350}} />
                            <View className='justify-center items-center rounded-xl' style={{zIndex: 1, width: '100%'}}>
                                <View className='rounded-b-xl px-3 py-5' style={{zIndex: 1, width: '100%'}}>
                                    <Text className='text-white text-xs' style={{fontFamily: 'Montserrat-SemiBold'}}>{value.eventStartDate.substring(0,10)}</Text>
                                    <Text className='text-white text-base mt-1' numberOfLines={2} style={{fontFamily: 'Montserrat-ExtraBold'}}>{value.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            />
        </>
    )
}

export default ProfileEventsRow
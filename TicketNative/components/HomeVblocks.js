import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

const HomeVblocks = ({data}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <Carousel
            layout={"default"}
            data={data}
            sliderWidth={width * 0.94}
            itemWidth={295}
            activeSlideAlignment='start'
            slideStyle={{justifyContent: 'flex-start', alignItems: 'flex-start'}}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('EventScreen', {slug: item.slug})}  key={item.id} className='relative rounded-xl mt-7' style={{width: 290, backgroundColor: '#141923'}}>
                    <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${item.bannerVerticalImg}`}} className='rounded-xl' style={{width: 290, height: 360}} />
                    <View className='justify-center items-center rounded-xl' style={{zIndex: 1, width: '100%'}}>
                        <View className='rounded-b-xl px-3 py-5' style={{zIndex: 1, width: '100%'}}>
                            <Text className='text-white text-xs' style={{fontFamily: 'Montserrat-SemiBold'}}>{item['eventStartDate'].substring(0,10)}</Text>
                            <Text className='text-white text-base mt-2' numberOfLines={2} style={{fontFamily: 'Montserrat-ExtraBold'}}>{item['name']}</Text>
                        </View>
                    </View>
                    <View className='absolute top-5 left-4 px-3 py-1 rounded-lg' style={{backgroundColor: item.category.bgColor}}>
                        <Text className='text-white text-base' style={{fontFamily: 'Montserrat-SemiBold', color: item.category.tintColor}}>{item.category.name}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default HomeVblocks
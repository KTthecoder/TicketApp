import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchBlock1 = ({data}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <>
            {data && data['events'].map((item, key) => (
                <View key={key} className='bg-[#131821] rounded-xl mt-8 justify-center items-center' style={{width: width * 0.94}}>
                    <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${item.bannerHorizontalImg}`}} className='rounded-xl' style={{width: '100%', height: 250}} />
                    <View className='py-5' style={{width: '92%'}}>
                        <View className='justify-center items-start'>
                            <View className='py-1 px-3 rounded-lg justify-center items-center' style={{backgroundColor: item.category.bgColor}}>
                                <Text className='text-sm' style={{fontFamily: 'Montserrat-Regular', color: item.category.tintColor}}>{item.category.name}</Text>
                            </View>
                        </View>
                        <Text className='text-gray-400 text-sm mt-4' style={{fontFamily: 'Montserrat-Medium'}}>{item['eventStartDate'].substring(0,10)}</Text>
                        <Text className='text-white text-xl mt-2' style={{fontFamily: 'Montserrat-SemiBold'}}>{item.name}</Text>
                        <View className='flex-row items-center mt-3' style={{marginLeft: -5}}>
                            <EvilIcons name="location" size={19} color="white" />
                            <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-Medium'}}>{item['localization']}</Text>
                        </View>
                        <Text className='text-gray-400 text-sm mt-3' style={{fontFamily: 'Montserrat-Medium'}}>Starts From 22$</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('EventScreen', {slug: item.slug})} className='bg-blue-500 rounded-xl justify-center items-center mt-5' style={{height: 50}}>
                            <Text className='text-white text-base text-center' style={{fontFamily: 'Montserrat-Medium'}}>Buy Ticket</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </>
        
        
    )
}

export default SearchBlock1
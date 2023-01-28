import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const MyTicketBlock = ({image, date, quantity, location, id}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate('MyTicketDetailsScreen', {id: id})} className='relative rounded-xl mt-7 flex-row justify-center bg-[#11151d]' style={{width: width * 0.94}}>
            <View className='flex-row justify-center items-center flex-1' style={{zIndex: 1, width: '40%', height: 150, borderRightWidth: 1.5, borderRightColor: '#3B82F6'}}>
                <View className='justify-center pl-1' style={{justifyContent: 'center', width: '90%', height: '100%'}}>
                    <Text className='text-blue-500 text-sm' style={{fontFamily: 'Montserrat-SemiBold'}}>{date.substring(0,10)}</Text>
                    <Text className='text-gray-100 text-base mt-2' style={{fontFamily: 'Montserrat-SemiBold'}}>{quantity} Ticket</Text>
                    <Text className='text-gray-100 text-sm mt-2' numberOfLines={2} style={{fontFamily: 'Montserrat-SemiBold'}}>{location}</Text>
                </View>
            </View>
            <View className='' style={{width: '55%', zIndex: -1}}>
                <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${image}`}} className='rounded-r-xl' style={{width: '100%', height: 150}} />
            </View>      
        </TouchableOpacity>
    )
}

export default MyTicketBlock
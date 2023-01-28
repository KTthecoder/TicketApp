import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeRblocks = ({data}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <>
            {data && data.map((item) => (
                <TouchableOpacity onPress={() => navigation.navigate('EventScreen')}  key={item.id} className='relative rounded-xl mt-7 flex-row justify-between bg-[#141923]' style={{width: width * 0.94, height: 125}}>
                    <View style={{width: '60%', justifyContent: 'center', paddingHorizontal: 15}}>
                        <Text className='text-gray-400 text-sm' style={{fontFamily: 'Montserrat-Regular'}}>19-08-2023</Text>
                        <Text className='text-white mt-1 text-base' style={{fontFamily: 'Montserrat-Medium'}}>{item.title}</Text>
                        <View className='justify-center items-start'>
                            <TouchableOpacity className='bg-blue-500 py-1 px-3 rounded-lg justify-center items-center mt-2'>
                                <Text className='text-white text-sm' style={{fontFamily: 'Montserrat-Regular'}}>Category</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='' style={{width: '40%'}}>
                        <Image source={item.image} className='rounded-xl' style={{width: '100%', height: 125}} />
                    </View>
                </TouchableOpacity>
            ))}
        </>   
    )
}

export default HomeRblocks
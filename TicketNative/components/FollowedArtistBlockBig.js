import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const FollowedArtistBlockBig = () => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ArtistScreen')} className='relative rounded-full mt-6 mr-3 justify-center items-center' style={{width: 110}}>
        <Image source={require('../assets/kendrick.png')} className='rounded-full' style={{width: 95, height: 95}} />
        <Text className='text-white text-sm mt-3 text-center' numberOfLines={1} style={{fontFamily: 'Montserrat-Medium'}}>Kendrick Lamar</Text>
    </TouchableOpacity>
  )
}

export default FollowedArtistBlockBig
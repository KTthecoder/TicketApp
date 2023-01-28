import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ProfileArtistBlock = ({artists}) => {
    const navigation = useNavigation()

    return (
        <>
            {artists && artists.map((item) => (
                <TouchableOpacity key={item.id} onPress={() => navigation.navigate('ArtistScreen', {slug: item.slug})} className='relative rounded-full mt-6 mr-3 justify-center items-center' style={{width: 95}}>
                    <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${item.profileImage}`}} className='rounded-full' style={{width: 80, height: 80}} />
                    <Text className='text-white text-sm mt-3 text-center' numberOfLines={1} style={{fontFamily: 'Montserrat-Medium'}}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </>
    )
}

export default ProfileArtistBlock
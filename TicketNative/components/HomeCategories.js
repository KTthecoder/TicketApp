import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const HomeCategories = ({id, title, slug, bgColor, tintColor}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ByCategoryScreen', {slug: slug})} key={id} className='justify-center items-center mr-3'>
      <View className='items-center justify-center rounded-xl px-6' style={{height: 40, backgroundColor: bgColor}}>
        <Text className='text-sm text-center' style={{fontFamily: 'Montserrat-Medium', color: tintColor}}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default HomeCategories
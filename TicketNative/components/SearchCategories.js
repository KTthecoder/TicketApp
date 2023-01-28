import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const SearchCategories = ({title}) => {
  return (
    <TouchableOpacity className='mr-3'>
      <View className='items-center justify-center rounded-full bg-[#141923] px-6' style={{height: 40}}>
        <Text className='text-white text-sm text-center' style={{fontFamily: 'Montserrat-Medium'}}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SearchCategories
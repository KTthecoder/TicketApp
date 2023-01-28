import { View, ScrollView, SafeAreaView, TextInput, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import SearchBlock from '../components/SearchBlock';
import useFetchGet from '../hooks/useFetchGet';
import * as SecureStore from "expo-secure-store"

const SearchScreen = () => {
  const { width } = Dimensions.get('screen')
  const [dataSearch, setDataSearch] = useState('')
  const [isLoadingSearch, setIsLoadingSearch] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const { data, isLoading, setChange, change } = useFetchGet('http://192.168.1.34:8000/api/search')

  async function getData(value) {
    await SecureStore.getItemAsync("accessToken").then(async(token) => {
      let response = await fetch(`http://192.168.1.34:8000/api/search/${value}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
        },
      })
      let data = await response.json()
      setDataSearch(data)
      setIsLoadingSearch(false)
      console.log(data)
    })
  }

  if (isLoading){
    return (
      <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <SafeAreaView className='justify-start items-center bg-[#0c0f15] flex-1' style={{}}>  
      <View className='pb-5'>
        <View className='flex-row bg-[#11151d] rounded-xl items-center justify-between mt-1' style={{width: width * 0.94, height: 45}}>
          <View className='items-center justify-end' style={{width: '13%'}}>
            <AntDesign name="search1" size={24} color="white" />
          </View>
          <TextInput placeholder='Search in TicketsApp...' onChangeText={(value) => {
            if(value != ''){
              setSearchValue(value)
              getData(value)
            }
            else{
              setSearchValue('')
            }
            
          }} className='rounded-r-xl text-white' style={{width: '87%', height: 45}} placeholderTextColor={'gray'} />
        </View>
      </View> 
      <ScrollView contentContainerStyle={{justifyContent: 'start', alignItems: 'start', paddingBottom: 100, marginTop: -25}} style={{width: width * 0.94}} showsVerticalScrollIndicator={false}>
        {searchValue && searchValue != '' ? <SearchBlock data={dataSearch['EventsFound']}/> : data && <SearchBlock data={data['EventsRecomended']}/>}
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen
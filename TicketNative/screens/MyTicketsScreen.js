import { View, Text, SafeAreaView, Dimensions, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import MyTicketBlock from '../components/MyTicketBlock';
import useFetchGet from '../hooks/useFetchGet';
import * as SecureStore from "expo-secure-store"

const MyTicketsScreen = () => {
  const { width } = Dimensions.get('screen')
  const [ refreshing, setRefreshing ] = useState(false)

  const { data, isLoading, setData } = useFetchGet('http://192.168.1.34:8000/api/my-tickets')

  const onRefresh = React.useCallback(async () => {
    await SecureStore.getItemAsync("accessToken").then(async(token) => {
      let response = await fetch('http://192.168.1.34:8000/api/my-tickets', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
          },
      })
      let data = await response.json()
      console.log('Reloaded')
      setData(data)
  })
  }, []);

  if (isLoading){
    return (
      <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <SafeAreaView className='justify-start items-center bg-[#0c0f15] flex-1'>  
      <View className='justify-between items-center flex-row pb-5 pt-1' style={{width: width * 0.93}}>
        <View className='flex-row items-center justify-center' style={{width: width * 0.93}}>
          <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>My Tickets</Text>
        </View>
      </View>
      {data && data['Tickets'] != 'No Bought Tickets' ? 
        <FlatList
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{marginTop: -10, paddingBottom: 100}}
          refreshControl={<RefreshControl
            colors={["#fff", "#fff"]}
            refreshing={refreshing}
            onRefresh={onRefresh} 
          />}
          data={data['Tickets']}
          renderItem={({item}) => (
            item['orderItem'].map((value) => (
              <MyTicketBlock id={value.id} key={value.id} image={value.ticket.event.bannerHorizontalImg} date={value.ticket.event.eventStartDate} quantity={value.quantity} location={value.ticket.event.localization}/>
            )) 
          )}
        /> : <Text className='text-white text-lg mt-5' style={{fontFamily: 'Montserrat-SemiBold'}}>You Have No Bought Tickets</Text>}
      
    </SafeAreaView>
  )
}

export default MyTicketsScreen
import { View, Text, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import MyTicketBlock from '../components/MyTicketBlock';
import useFetchGet from '../hooks/useFetchGet';

const MyTicketsScreen = () => {
  const { width } = Dimensions.get('screen')

  const { data, isLoading, setChange, change } = useFetchGet('http://192.168.1.34:8000/api/my-tickets')

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
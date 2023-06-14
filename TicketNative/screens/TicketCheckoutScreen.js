import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import CartBlockCheckout from '../components/CartBlockCheckout';
import useFetchGet from '../hooks/useFetchGet';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import * as SecureStore from "expo-secure-store"

const TicketCheckoutScreen = () => {
  const { width } = Dimensions.get('screen')
  const navigation = useNavigation()
  const [cardDetails, setCardDetails] = useState()
  const { confirmPayment, loading } = useConfirmPayment()
  const [email, setEmail] = useState()
  const [orderTotal, setOrderTotal] = useState()
  const [orderId, setOrderId] = useState()
  
  const { data, isLoading, setChange, change } = useFetchGet('http://192.168.1.34:8000/api/checkout')

  const GetStripeKey = async () => {
    let response = await fetch('http://192.168.1.34:8000/api/stripe/payment', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        orderTotal: orderTotal,
      })
    })
    const clientSecret = await response.json()
    return {clientSecret}
  }

  useEffect(() => {
    if(data){
      setEmail(data['CheckoutInfo']['email'])
      setOrderTotal(data['OrderTotal'])
      setOrderId(data['OrderItems'][0]['order'])
    }
  }, [data])

  const handlePayment = async () => {
    if(!cardDetails?.complete){
      Alert.alert('Please enter card details')
      return
    }

    const billingDetails = {
      email: email
    }

    try{
      const { clientSecret } = await GetStripeKey()
      if(clientSecret['Error']){
        alert('Error while creating payment')
      }
      else{
        const { paymentIntent, error } = await confirmPayment(
          clientSecret, {
            paymentMethodType: "Card",
            paymentMethodData: billingDetails,
          }
        )
        if(error){
          alert(`Payment Confirmation Error ${error.message}`)
        }
        else if(paymentIntent){

          await SecureStore.getItemAsync("accessToken").then(async(token) => {
            let response = await fetch(`http://192.168.1.34:8000/api/accept-order-payment`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
              },
              body: JSON.stringify({
                orderId: orderId,
              })
            })
            const data = await response.json()
          })

          alert("Payment Succesful")
          setChange(!change)
          navigation.navigate('TabNav', {screen: 'MyTicketDetailsScreen'})
        }
      }
    }
    catch (e){
      console.log(e)
    }
  }

  if (isLoading){
    return (
      <View className='h-screen justify-center items-center w-screen bg-[#141414]'>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <SafeAreaView className='w-screen justify-start items-center bg-[#0c0f15] flex-1'>
      <View className='justify-between items-center flex-row pb-3' style={{width: width * 0.94}}>
        <View className='flex-row items-center justify-between' style={{width: width * 0.94}}>
          <TouchableOpacity className='pr-2 py-2' onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
          <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>Checkout</Text>
          <TouchableOpacity className='pl-2 py-2' style={{opacity: 0}}>
            <AntDesign name="search1" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View className='absolute bottom-0 bg-[#0c0f15]' style={{zIndex: 1, height: 145, width: width, justifyContent: 'center', alignItems: 'center'}}>
        <View className='absolute bottom-16' style={{zIndex: 1, width: width * 0.94}}>
          <TouchableOpacity style={{width: '100%', zIndex: 1}} onPress={() => handlePayment()} disabled={loading} className='justify-center items-center bg-blue-500 pt-4 pb-4 rounded-md mt-9'>
            <Text className='text-white text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>Pay ${data && data['OrderTotal']}</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={{paddingBottom: 150, width: width * 0.94}} showsVerticalScrollIndicator={false}>
        <View className='justify-start w-sceeen flex-row items-center mt-5 bg-[#141923] rounded-xl px-5'>
          <View className='w-screen flex-1 justify-center' style={{height: 55}}>
            <Text className='text-base' style={{fontFamily: 'Montserrat-Regular', color: 'white'}}>{data && data['CheckoutInfo']['first_name']}</Text>
          </View>
        </View>

        <View className='justify-start w-sceeen flex-row items-center mt-5 bg-[#141923] rounded-xl px-5'>
          <View className='w-screen flex-1 justify-center' style={{height: 55}}>
            <Text className='text-base' style={{fontFamily: 'Montserrat-Regular', color: 'white'}}>{data && data['CheckoutInfo']['last_name']}</Text>
          </View>
        </View>

        <View className='justify-start w-sceeen flex-row items-center mt-5 bg-[#141923] rounded-xl px-5'>
          <View className='w-screen flex-1 justify-center' style={{height: 55}}>
            <Text className='text-base' style={{fontFamily: 'Montserrat-Regular', color: 'white'}}>{data && data['CheckoutInfo']['email']}</Text>
          </View>
        </View>

        <View className='justify-start w-sceeen flex-row items-center mt-5 bg-[#141923] rounded-xl text-white'>
          <CardField
          postalCodeEnabled={false}
            placeholders={{
              number: "4242 4242 4242 4242",
            }}
            onCardChange={cardDetails => {
              setCardDetails(cardDetails)
            }}
            cardStyle={{
              textColor: '#ffffff',
            }}
            style={{width: '100%', height: 55, color: 'white'}}
          />
        </View>
        
        <Text className='text-white text-xl mb-3 mt-10 text-center' style={{fontFamily: 'Montserrat-SemiBold', width: width * 0.94}}>Your Tickets</Text>
        {data && data['OrderItems'].map((item) => (
          <CartBlockCheckout key={item.id} quantity={item.quantity} id={item.id} eventName={item.ticket.event.name} ticketName={item.ticket.name} itemTotal={item['item_total']}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TicketCheckoutScreen
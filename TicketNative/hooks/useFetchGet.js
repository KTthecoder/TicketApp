import React, { useEffect, useState } from 'react'
import * as SecureStore from "expo-secure-store"
import { useNavigation } from '@react-navigation/native'

const useFetchGet = (url, another) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState()
    const [change, setChange] = useState(false)
    const navigation = useNavigation()

    async function getData() {
        await SecureStore.getItemAsync("accessToken").then(async(token) => {
            setToken(token)
            let response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
            })
            let data = await response.json()
            setData(data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if(another){
            navigation.addListener('focus', () => {
                getData()
            })
        }
        else{
            getData()
        }
    }, [change])
    
  return {data, isLoading, setChange, change, setData}
}

export default useFetchGet
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import HomeVblocks from './HomeVblocks';
import HomeRblocks from './HomeRblocks';
import SearchBlock from './SearchBlock';
import { useNavigation } from '@react-navigation/native';

const HomeVrow = ({data, title, row, category}) => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()

    return (
        <>
            <View className='mt-8 flex-row items-center justify-between' key={data.id} style={{width: width * 0.94}}>
                <Text className='text-white text-xl' style={{fontFamily: 'Montserrat-SemiBold'}}>{title}</Text>
                {category && category === 'recomended' ? 
                    <TouchableOpacity onPress={() => navigation.navigate('AllRecommendedEventsScreen')}>
                        <Text className='text-blue-500 text-sm' style={{fontFamily: 'Montserrat-Regular'}}>See All</Text>
                    </TouchableOpacity>
                : null}
                {category && category === 'in-warsaw' ? 
                    <TouchableOpacity onPress={() => navigation.navigate('AllLocationEventsScreen')}>
                        <Text className='text-blue-500 text-sm' style={{fontFamily: 'Montserrat-Regular'}}>See All</Text>
                    </TouchableOpacity>
                : null}
                {category && category === 'festival' ? 
                    <TouchableOpacity onPress={() => navigation.navigate('RowByCategoryScreen', {slug: 'festival', title: 'Festivals'})}>
                        <Text className='text-blue-500 text-sm' style={{fontFamily: 'Montserrat-Regular'}}>See All</Text>
                    </TouchableOpacity>
                : null}
                
            </View>
            {row == false ? <HomeVblocks data={data}/> : <SearchBlock data={data}/>}
        </>
    )
}

export default HomeVrow
import React, { useState, useEffect } from 'react'
import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon,
    ListArea
} from './styles'
import Api from '../../Api'
import { Platform, RefreshControl } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { request, PERMISSIONS } from 'react-native-permissions'
import Geolocation from '@react-native-community/geolocation'
import BarberCard from '../../components/BarberCard'

export default () => {

    const navigation = useNavigation()
    const [location, setLocation] = useState('')
    const [coords, setCoords] = useState(null)
    const [loading, setLoading] = useState(false)
    const [barbers, setBarbers] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getBarbers()
    }, [])

    const onRefresh = () => {
        setRefreshing(false)
        getBarbers()
    }

    const handleLocationFinder = async () => {
        setCoords(null)

        let result = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    
        if(result == 'granted') {
            setLocation('')

            Geolocation.getCurrentPosition((info) => {
                setCoords(info.coords)
                getBarbers()
            })
        } 
    }

    const getBarbers = async () => {
        setLoading(true)
        setBarbers([])

        let res = await Api.getBarbers()
        
        if(res) {
            setBarbers(res.data)
            setLocation(res.loc)
        }

        setLoading(false)
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFF" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput placeholder="Onde você está?" placeholderTextColor="#FFF" onChangeText={t=>setLocation(t)} value={location} />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFF" />
                    </LocationFinder>
                </LocationArea>

                {loading && <LoadingIcon size="large" color="#FFF" /> }

                <ListArea>
                    {barbers.map((barber, k) => 
                        <BarberCard key={k} data={barber} />
                    )}
                </ListArea>
            </Scroller>
        </Container>
    )
}

import React, { useContext, useEffect } from 'react'
import { Container, LoadingIcon } from './styles'
import BarberLogo from '../../assets/barber.svg'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'

import Api from '../../Api'
import { UserContext } from '../../contexts/UserContext'

export default props => {
    const { dispatch: userDispatch } = useContext(UserContext)
    const navigation = useNavigation()

    useEffect(() => {
        const checkToken = async () => {
            
            const token = await AsyncStorage.getItem('token')

            if(token !== null) {
                let res = await Api.checkToken(token)
                
                if(res && res.token) {
                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: res.data.avatar
                        } 
                    })
    
                    navigation.reset({
                        routes: [{name: 'MainTab'}]
                    })
                } else {
                    navigation.navigate('SignIn')
                }
            } else {
                navigation.navigate('SignIn')
            }
        }

        checkToken()
    }, [])

    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#FFF" />
        </Container>
    )
}
import React, { useContext, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold 
} from './styles'

import SignInput from '../../components/SignInput'

import BarberLogo from '../../assets/barber.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'

import Api from '../../Api'
import AsyncStorage from '@react-native-community/async-storage'
import { UserContext } from '../../contexts/UserContext'

export default props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { dispatch: userDispatch } = useContext(UserContext)
    const nav = useNavigation()

    const handleSignIn = async () => {
        if(email!='' && password!='') {
            const res = await Api.signIn(email, password)

            if(res.token) {
                await AsyncStorage.setItem('token', res.token)

                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: res.data.avatar
                    } 
                })

                nav.reset({
                    routes: [{name: 'MainTab'}]
                })
            } else {
                alert('Email e/ou senha incorretos.')
            }
        }
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <InputArea>
                <SignInput 
                    IconSvg={EmailIcon} 
                    placeholder="Digite seu email"
                    value={email} 
                    onChangeText={t=>setEmail(t)} />
                <SignInput 
                    IconSvg={LockIcon} 
                    placeholder="Digite sua senha"  
                    value={password}
                    onChangeText={t=>setPassword(t)} 
                    password={true}
                        />                
                <CustomButton onPress={handleSignIn}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>
                

            <SignMessageButton onPress={() => nav.reset({routes: [{name: 'SignUp'}]})}>
                <SignMessageButtonText>Ainda não possui cadastro?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se!</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
}

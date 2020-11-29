import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

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
import PersonIcon from '../../assets/person.svg'

import Api from '../../Api'
import AsyncStorage from '@react-native-community/async-storage'
import { UserContext } from '../../contexts/UserContext'

export default props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const nav = useNavigation()
    const { dispatch: userDispatch } = useContext(UserContext)

    const handleSignUp = async () => {
        if(name && email && password) {
            let res = await Api.signUp(name, email, password)
            
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
                alert('Erro no login: ' + res.error) 
            }
        } else {    
            alert('Preencha os campos!')
        }
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <InputArea>
                <SignInput 
                    IconSvg={PersonIcon} 
                    placeholder="Digite seu nome"
                    value={name} 
                    onChangeText={t=>setName(t)} />
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
                <CustomButton onPress={handleSignUp}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>
                

            <SignMessageButton onPress={() => nav.reset({routes: [{name: 'SignIn'}]})}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça login!</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container> 
    )
}

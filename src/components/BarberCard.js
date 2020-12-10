import React, { useReducer } from 'react'
import styled from 'styled-components/native'
import Stars from './Stars'

export default ({data}) => {
    const Area = styled.TouchableOpacity`
        background-color: #FFF;
        margin-bottom: 20px;
        border-radius: 20px;
        padding: 15px;
        flex-direction: row
    `

    const Avatar = styled.Image`
        width: 88px;
        height: 88px;
        border-radius: 20px;
    `

    const InfoArea = styled.View`
        margin-left: 20px;
        justify-content: space-between
    `

    const UserName = styled.Text`
        font-size: 17px;
        font-weight: bold;
    `

    const SeeProfileButton = styled.TouchableOpacity`
        width: 85px;
        height: 26px;
        border: 1px solid #4eadbe;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
    `

    const SeeProfileButtonText = styled.Text`
        font-size: 13px;
        color: #268596 
    ` 

    return (
        <Area>
            <Avatar source={{uri: data.avatar}}/>
            <InfoArea>
                <UserName>{data.name}</UserName>

                <Stars stars={data.stars} showNumber={true} />

                <SeeProfileButton>
                    <SeeProfileButtonText>Ver Perfil</SeeProfileButtonText>
                </SeeProfileButton>
            </InfoArea>
        </Area>
    )
}
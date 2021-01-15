import React, {useState, useEffect} from 'react'
import BarberCard from '../../components/BarberCard'
import Api from '../../Api'

import {
    Container,
    Scroller,
    LoadingIcon,
    ListArea,
    EmptyWarning,
    HeaderArea,
    HeaderTitle
} from './styles' 
import { RefreshControl } from 'react-native'

export default () => {
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [emptyList, setEmptyList] = useState(false)
    
    useEffect(() => {
        getFavourites()
    }, [])

    const getFavourites = async () => {
        setEmptyList(false)
        setLoading(true)
        setList([])

       
        let res = await Api.getFavourites()
        
        if(res.error == '') {
            if(res.list.length) {
                setList(res.list)
            } else {
                setEmptyList(true)
            }   
        } else {
            alert(res.error)
        }

        setLoading(false)
    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>Favoritos</HeaderTitle>
            </HeaderArea>
            <Scroller refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getFavourites} />
                }>
                {emptyList && <EmptyWarning>Você ainda não adicionou nenhum barbeiro a seus favoritos!</EmptyWarning>}

                <ListArea>
                    {list.map((item, k) => (
                        <BarberCard  key={k} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    )
}

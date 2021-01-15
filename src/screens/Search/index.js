import React, {useState} from 'react'
import BarberCard from '../../components/BarberCard'
import Api from '../../Api'

import {
    Container,
    SearchArea,
    SearchInput,
    Scroller,
    LoadingIcon,
    ListArea,
    EmptyWarning
} from './styles' 

export default () => {

    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [emptyList, setEmptyList] = useState(false)
    
    const searchBarbers = async () => {
        setEmptyList(false)
        setLoading(true)
        setList([])

        if(searchText != '') {
            let res = await Api.search(searchText)
            
            if(res.error == '') {
                if(res.list.length) {
                    setList(res.list)
                } else {
                    setEmptyList(true)
                }   
            } else {
                alert(res.error)
            }
        }

        setLoading(false)
    }

    return (
        <Container>
            <SearchArea>
                <SearchInput 
                    placeholder="Digite o nome do barbeiro"
                    placeholderTextColor="#FFF"
                    value={searchText}
                    onChangeText={t=>setSearchText(t)}
                    onEndEditing={searchBarbers}
                    returnKeyType="search"
                    autoFocus
                    selectTextOnFocus
                />
            </SearchArea>

            <Scroller>
                {loading && <LoadingIcon size="large" color="#000" />}

                {emptyList && <EmptyWarning>Não encontramos barbeiros para a sua busca!</EmptyWarning>}

                <ListArea>
                    {list.map((item, k) => (
                        <BarberCard  key={k} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    )
}

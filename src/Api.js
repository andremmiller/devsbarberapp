import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
const BASE_API = 'https://devsbarber.api.amapps.com.br/api'

export default {
    checkToken: async (token) => {
        try {  
            const res = await axios.post(`${BASE_API}/auth/refresh`, {
                token
            })      
            
            return res.data
            
        } catch(e) {
            return false
        }
    },
    signIn: async (email, password) => {
        const res = await axios.post(`${BASE_API}/auth/login`, {
            email,
            password 
        })
       
        return res.data
    },
    signUp: async (name, email, password) => {
        const res = await axios.post(`${BASE_API}/user`, {
            name,
            email,
            password 
        })

        return res.data
    },
    getBarbers: async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            //console.log(token)
            const req = await axios.get(`${BASE_API}/barbers?token=${token}`)
            return req.data
        } catch(e) {
            console.log(e)
            return false
        }
    }
}
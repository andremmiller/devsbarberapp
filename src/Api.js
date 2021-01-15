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
    logout: async () => {
        const token = await AsyncStorage.getItem('token')

        const res = await axios.post(`${BASE_API}/auth/logout?token=${token}`)

        return res.data
    },
    getBarbers: async (lat = '', lng = '', address = '') => {
        try {
            const token = await AsyncStorage.getItem('token')
            
            // console.log("LAT", lat)
            // console.log("LONG", lng)
            // console.log("ADD", address)
            // console.log(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&city=${address}`)

            const req = await axios.get(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}`)
            
            // console.log(req.data)
            return req.data
        } catch(e) {
           // console.log(e)
            return false
        }
    },
    getBarber: async (id) => {
        const token = await AsyncStorage.getItem('token')
        const req = await axios.get(`${BASE_API}/barber/${id}?token=${token}`)

       // console.log(req.data)
        return req.data
    },
    setAppointment: async(barberIid, service, selectedYear, selectedMonth, selectedDay, selectedHour) => {
        try {
            const token = await AsyncStorage.getItem('token')

            const req = await axios.post(`${BASE_API}/user/appointment?token=${token}`, {
                barberId,
                service,
                selectedYear,
                selectedMonth,
                selectedDay,
                selectedHour
            })
            
            // console.log(req.data)
            return req.data
        } catch(e) {
           // console.log(e)
            return false
        }
    }
}
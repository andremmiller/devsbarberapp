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
    setAppointment: async(barberId, service, selectedYear, selectedMonth, selectedDay, selectedHour) => {
        try {
            const token = await AsyncStorage.getItem('token')

            const req = await axios.post(`${BASE_API}/barber/${barberId}/appointment?token=${token}`, {
                service,
                'year': selectedYear,
                'month': selectedMonth,
                'day': selectedDay,
                'hour': selectedHour
            })
            
            // console.log(req.data)
            return req.data
        } catch(e) {
           // console.log(e)
            return false
        }
    },
    search: async (barberName) => {
        const token = await AsyncStorage.getItem('token')
        const req = await axios.get(`${BASE_API}/search?token=${token}&q=${barberName}`)

       // console.log(req.data)
        return req.data
    },
    getFavourites: async (barberName) => {
        const token = await AsyncStorage.getItem('token')
        const req = await axios.get(`${BASE_API}/user/favourites?token=${token}`)

       // console.log(req.data)
        return req.data
    },
    setFavourite: async (barberId) => {
        try {
            const token = await AsyncStorage.getItem('token')

            const res = await axios.post(`${BASE_API}/user/favourite?token=${token}`, {
                'barber': barberId 
            })
            
            // console.log(req.data)
            return res.data
        } catch(e) {
            console.log(e)
            return false
        }
    },
}
import axios from 'axios'
const BASE_API = 'https://devsbarber.api.amapps.com.br/api'

export default {
    checkToken: async (token) => {
        try {  
            const res = axios.post(`${BASE_API}/auth/refresh`, {
                token
            })
            return res.data
            
        } catch(e) {
            console.log('ERROR: ' + e)
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
    }
}
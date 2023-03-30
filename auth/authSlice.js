import { atom } from 'recoil'
import axios from 'axios'

export const employeeState = atom({
    key: 'employeeState',
    default: {},
})

export const loginEmployee = async(email, password) => {
    try {
        const response =  await axios.post('https://hire-in.vercel.app/employees/login', {email: email, password: password})
        return response.data
    }
    catch(error) {
        return error.message
    }
}
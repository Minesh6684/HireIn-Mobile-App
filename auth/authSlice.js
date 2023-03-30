import { atom } from 'recoil'
import axios from 'axios'

export const userState = atom({
    key: 'userState',
    default: {},
})

export const registerEmployee = async(userData) => {
    try {
        const response =  await axios.post('https://hire-in.vercel.app/employees/register', userData)
        return response.data
    }
    catch(error) {
        return error.message
    }
}

export const loginEmployee = async(email, password) => {
    try {
        const response =  await axios.post('https://hire-in.vercel.app/employees/login', {email: email, password: password})
        return response.data
    }
    catch(error) {
        return error.message
    }
}

export const updateEmployee = async(userData) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        const response =  await axios.put('https://hire-in.vercel.app/employees/update', userData, config)
        return response.data
    }
    catch(error) {
        return error.message
    }
}

export const registerEmployer = async(userData) => {
    try {
        const response =  await axios.post('https://hire-in.vercel.app/employers/register', userData)
        return response.data
    }
    catch(error) {
        return error.message
    }
}

export const loginEmployer = async(email, password) => {
    try {
        const response =  await axios.post('https://hire-in.vercel.app/employers/login', {email: email, password: password})
        return response.data
    }
    catch(error) {
        return error.message
    }
}

export const updateEmployer = async(userData) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        const response =  await axios.put('https://hire-in.vercel.app/employers/update', userData, config)
        return response.data
    }
    catch(error) {
        return error.message
    }
}
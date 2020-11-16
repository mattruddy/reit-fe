import axios from 'axios'
import { BASE } from '../utils/const'

export const signup = async (username: string, password: string) => {
    try {
        const resp = await axios.post(BASE + "/public/signup", {
                email: username,
                password: password
        })
        return resp.data
    } catch (e) {
        return e.response.data.message
    }
}

export const login = async (username: string, password: string) => {
    try {
        const resp = await axios.post(BASE + "/public/login", {
            username: username,
            password: password
        })
        return resp.data
    } catch (e) {
        return e.response.data.message
    }
}

export const getLinkedToken = async (token: string) => {
    const resp = await axios.get(BASE + "/secure/linked-token", {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return resp.data.token
}

export const createLinkedTokenAccess = async (token: string, plaidToken: string) => {
    const resp = await axios.post(BASE + `/secure/token-access/${plaidToken}`,{}, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return resp.data
}

export const getAccount = async (token: string) => {
    const resp = await axios.get(BASE + '/secure/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return await resp.data
}

export const transferFunds = async (token: string, accountId: string, amount: number) => {
    const resp = await axios.post(BASE + '/secure/transfer', {
        accountId: accountId,
        amount: amount
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

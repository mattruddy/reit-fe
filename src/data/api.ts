import axios from 'axios'

import {BASE} from '../utils/const'
import { bankType, Investor, Transaction } from '../utils/type'

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

export const getAccount = async (token: string) => {
    const resp = await axios.get(BASE + '/secure/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return await resp.data
}

export const transferFunds = async (token: string, transferDate: string, amount: number,
    to: string, from: string) => {
    const resp = await axios.post(BASE + '/secure/transfer', {
        transferDate: transferDate,
        amount: amount,
        to: to,
        from: from
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return resp.data as Transaction
}

export const getBankFromRn = async (routerNumber: string) => {
    const resp = await axios.get(`https://www.routingnumbers.info/api/name.json?rn=${routerNumber}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return resp.data
}

export const linkBankAccount = async (token: string, bankType: bankType, bankName: string,
        rNumber: string, aNumber: string) => {
    const resp = await axios.put(BASE + "/secure/account", {
        bankType: bankType,
        bankName: bankName,
        accountNumber: aNumber,
        routingNumber: rNumber
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return resp.data as Investor
}

export const removeBankAccount = async (token: string) => {
    const resp = await axios.delete(BASE + "/secure/account", {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return resp.data as Investor
}
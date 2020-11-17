export interface Profile {
    email: string 
    account: Account[]
    investor: Investor
}

export interface Account {
    accountId: string 
    balances: Balance
    mask: string 
    name: string
    subtype: string
}

export interface Investor {
    accountNumber: string 
    memberDate: Date
    amount: number 
    dividends: Dividends[]
}

export interface Dividends {
    id: number 
    amount: number 
    createdAt: Date
}

export interface Balance {
    available: number 
    current: number
    isoCurrencyCode: string
}

export interface AuthResp {
    status: "success" | "error"
    data: string
}

export type bankType = "SAVING" | "CHECKING"
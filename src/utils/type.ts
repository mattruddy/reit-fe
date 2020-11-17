export interface Profile {
    email: string 
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
    memberDate: Date
    amount: number 
    bankName: string 
    bankType: bankType
    lastFourAccountNumber: string
    dividends: Dividend[]
    transactions: Transaction[]
    trossAccount: string
}

export interface Dividend {
    id: number 
    amount: number 
    createdAt: Date
}

export interface Transaction {
    id: number 
    amount: number 
    createdAt: Date 
    transferStatus: transferStatus
    transactionType: transactionType
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

export type transferStatus = "PENDING" | "COMPLETE" | "DENIED"

export type transactionType = "CREDIT" | "DEBIT"
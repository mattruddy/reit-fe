import { atom } from "recoil"
import { Dividend, Investor, Transaction } from "../utils/type"

export const tokenState = atom({
    key: "token",
    default: undefined as string | undefined,
})

export const linkedTokenState = atom({
  key: "linkedToken",
  default: undefined as string | undefined,
})

export const isLoggedInState = atom({
  key: "isLoggedIn",
  default: undefined as undefined | boolean,
})

export const emailState = atom({
  key: "email",
  default: undefined as string | undefined
})

export const investorState = atom({
  key: "investor",
  default: undefined as Investor | undefined
})

export const dividendState = atom({
  key: "dividend",
  default: undefined as Dividend[] | undefined
})

export const transactionState = atom({
  key: "transaction",
  default: undefined as Transaction[] | undefined
})
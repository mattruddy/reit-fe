import { atom } from "recoil"
import { Profile } from "../utils/type"

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

  export const profileState = atom({
    key: "profile",
    default: undefined as Profile | undefined
  })
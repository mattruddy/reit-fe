import React from 'react'
import { useRecoilValue } from 'recoil'
import { createLinkedTokenAccess } from '../data/api'
import { linkedTokenState, tokenState } from '../store'
import { usePlaidLink } from 'react-plaid-link';

const BankLink = () => {
    const auth = useRecoilValue(tokenState)
    const linkedToken = useRecoilValue(linkedTokenState)

    const onSuccess = async (token: any, metadata: any) => {
        createLinkedTokenAccess(auth!, token)
    }

    const config = {
        token: linkedToken,
        onSuccess
    } as any

    const { open, ready } = usePlaidLink(config);

    return (
        <div>
            <button onClick={(e) => {
                e.preventDefault()
                open()
            }} disabled={!ready}>Link Bank</button>
        </div>
    )
}

export default BankLink
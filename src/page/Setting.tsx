import React, { useCallback } from 'react'
import { Container } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { createInvestor, createLinkedTokenAccess } from '../data/api'
import { linkedTokenState, tokenState } from '../store'
import { PlaidLink } from 'react-plaid-link';
import InvestorForm from '../component/InvestorForm'

const Setting = () => {
    const token = useRecoilValue(tokenState)
    const linkedToken = useRecoilValue(linkedTokenState)

    const onSuccess = useCallback((accessToken: any, metadata: any) => {
        createLinkedTokenAccess(token!, accessToken)
    }, [token])
      
    return <Container>
        {linkedToken &&
            <PlaidLink token={linkedToken} onSuccess={onSuccess}>
                Add Bank Account
            </PlaidLink>}
            <InvestorForm onSubmit={(amount: number) => {
                createInvestor(token!, amount)
            }} />
    </Container>
}

export default Setting
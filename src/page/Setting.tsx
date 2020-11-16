import React, { useCallback } from 'react'
import { Container } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { createInvestor, createLinkedTokenAccess } from '../data/api'
import { linkedTokenState, profileState, tokenState } from '../store'
import { PlaidLink } from 'react-plaid-link';
import InvestorForm from '../component/InvestorForm'
import AccountCard from '../component/AccountCard'

const Setting = () => {
    const token = useRecoilValue(tokenState)
    const linkedToken = useRecoilValue(linkedTokenState)
    const profile = useRecoilValue(profileState)

    const onSuccess = useCallback((accessToken: any, metadata: any) => {
        console.log("her")
        console.log(metadata)
        createLinkedTokenAccess(token!, accessToken)
    }, [token])
      
    return <Container>
        {linkedToken &&
            <PlaidLink token={linkedToken} onSuccess={onSuccess}>
                Add Bank Account
            </PlaidLink>}
            {profile && profile.account.map((a, i) => (
                <AccountCard key={i} account={a} />
            ))}
            {/* <InvestorForm onSubmit={(amount: number) => {
                createInvestor(token!, amount)
            }} /> */}
    </Container>
}

export default Setting
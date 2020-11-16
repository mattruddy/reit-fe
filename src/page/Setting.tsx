import React, { useCallback } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { createLinkedTokenAccess } from '../data/api'
import { linkedTokenState, profileState, tokenState } from '../store'
import { PlaidLink } from 'react-plaid-link';
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
        <Row>
            <Col>
        {linkedToken &&
            <PlaidLink token={linkedToken} onSuccess={onSuccess}>
                Add Bank Account
            </PlaidLink>}
            </Col>
        </Row>
        <div className="space" />
        <Row>      
            {profile && profile.account.map((a, i) => (
                <Col xs="12" md="6">
                    <AccountCard key={i} account={a} />
                </Col>
            ))}
        </Row>
    </Container>
}

export default Setting
import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import AccountCard from '../component/AccountCard'
import BankLinkModal from '../component/BankLinkModal'
import { investorState } from '../store'

const LINK_HEADER = "Link Bank Account to easily transfer money"
const TRANSFER_HEADER ="Transfers funds to expand your portfolio"

const Setting = () => {
    const investor = useRecoilValue(investorState)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggle = () => setIsOpen(!isOpen)
      
    return <Container>
        <Row>
            <Col>
                <h1>{investor ? TRANSFER_HEADER : LINK_HEADER}</h1>
            </Col>
        </Row>
        <div className="space" />
        <Row>
            <Col>
                {investor ? <AccountCard investor={investor} /> : <Button onClick={toggle}>Link Bank Account</Button> }
            </Col>
        </Row>
        <BankLinkModal isOpen={isOpen} toggle={toggle} />
    </Container>
}

export default Setting
import React, { useCallback, useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import BankLinkModal from '../component/BankLinkModal'

const Setting = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggle = () => setIsOpen(!isOpen)
      
    return <Container>
        <Row>
            <Col>
                <h1>Link Bank Account to easily transfer money</h1>
            </Col>
        </Row>
        <div className="space" />
        <Row>
            <Col>
            <Button onClick={toggle}>Link Bank Account</Button>
            </Col>
        </Row>
        <BankLinkModal isOpen={isOpen} toggle={toggle} />
    </Container>
}

export default Setting
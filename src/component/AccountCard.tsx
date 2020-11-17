import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardGroup, CardHeader, CardSubtitle, CardTitle } from 'reactstrap'
import { Investor } from '../utils/type'
import TransferModal from './TransferModal'

interface Props {
    investor: Investor
}

const AccountCard = ({investor}: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggle = () => setIsOpen(!isOpen)

    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle><b>xxxxx-{investor.lastFourAccountNumber}</b></CardTitle>
                <CardSubtitle><i>{investor.bankName}</i></CardSubtitle>
            </CardHeader>
            <CardBody>
                <CardGroup>
                    <div style={{
                        width: "100%",
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <span style={{fontSize: "1.5rem"}}><b>{investor.bankType}</b></span>
                    </div>
                </CardGroup>
                <div style={{height: "1rem"}} />
                <CardGroup>
                </CardGroup>
            </CardBody>
            <CardFooter>
                <Button onClick={toggle}>Transfer Funds</Button>
            </CardFooter>
        </Card>
        <TransferModal isOpen={isOpen} toggle={toggle} />
        </>
    )
}

export default AccountCard
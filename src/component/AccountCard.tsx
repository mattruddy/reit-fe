import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardGroup, CardHeader, CardSubtitle, CardTitle } from 'reactstrap'
import { Account } from '../utils/type'
import { currencyFormat } from '../utils/utils'
import TransferModal from './TransferModal'

interface Props {
    account: Account
}

const AccountCard = ({account}: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectAccount, setSelectAccount] = useState<Account>()

    const toggle = () => setIsOpen(!isOpen)

    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle><b>{account.name}</b></CardTitle>
                <CardSubtitle><i>{account.subtype}</i></CardSubtitle>
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
                        <h4><b>Current</b></h4>
                        <span style={{fontSize: "1.5rem"}}>{currencyFormat.format(account.balances.current)}</span>
                    </div>
                </CardGroup>
                <div style={{height: "1rem"}} />
                <CardGroup>
                    <div style={{
                        width: "100%",
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <h4><b>Available</b></h4>
                        <span style={{fontSize: "1.5rem"}}>{currencyFormat.format(account.balances.available)}</span>
                    </div>
                </CardGroup>
            </CardBody>
            <CardFooter>
            <Button onClick={(e) => {
                        e.preventDefault()
                        setSelectAccount(account)
                        toggle()
                    }}>Transfer Funds</Button>
            </CardFooter>
        </Card>
        <TransferModal isOpen={isOpen} toggle={toggle} account={selectAccount} />
        </>
    )
}

export default AccountCard
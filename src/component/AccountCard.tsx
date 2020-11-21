import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardGroup, CardHeader, CardSubtitle, CardTitle } from 'reactstrap'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { removeBankAccount } from '../data/api'
import { investorState, tokenState } from '../store'
import { Investor } from '../utils/type'
import RemoveBankModal from './RemoveBankModal'
import TransferModal from './TransferModal'

interface Props {
    investor: Investor
}

const AccountCard = ({investor}: Props) => {
    const token = useRecoilValue(tokenState)
    const setInvestor = useSetRecoilState(investorState)
    const [isOpenTrans, setIsOpenTrans] = useState<boolean>(false)
    const [isOpenRemove, setIsOpenRemove] = useState<boolean>(false)
    const toggleTrans = () => setIsOpenTrans(!isOpenTrans)
    const toggleRemove = () => setIsOpenRemove(!isOpenRemove)

    const handleRemoveBank = async () => {
        const resp = await removeBankAccount(token!)
        setInvestor(resp)
    }

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
                <Button onClick={toggleTrans}>Transfer Funds</Button>
            </CardFooter>
        </Card>
        <Button onClick={toggleRemove}>Remove Bank</Button>
        <TransferModal isOpen={isOpenTrans} toggle={toggleTrans} />
        <RemoveBankModal isOpen={isOpenRemove} toggle={toggleRemove} onDelete={handleRemoveBank} />
        </>
    )
}

export default AccountCard
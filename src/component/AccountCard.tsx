import React from 'react'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { transferFunds } from '../data/api'
import { tokenState } from '../store'
import { Account } from '../utils/type'
import { currencyFormat } from '../utils/utils'

interface Props {
    account: Account
}

const AccountCard = ({account}: Props) => {
    const token = useRecoilValue(tokenState)

    return (
        <Card>
            <CardHeader>
                {account.name}
            </CardHeader>
            <CardBody>
                {currencyFormat.format(account.balances.available)}
                <Button onClick={(e) => {
                    e.preventDefault()
                    transferFunds(token!, account.accountId, 100)
                }}>Choose</Button>
            </CardBody>
        </Card>
    )
}

export default AccountCard
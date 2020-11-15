import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'
import { Account } from '../utils/type'
import { currencyFormat } from '../utils/utils'

interface Props {
    account: Account
}

const AccountCard = ({account}: Props) => {
    return (
        <Card>
            <CardHeader>
                {account.name}
            </CardHeader>
            <CardBody>
                {currencyFormat.format(account.balances.available)}
            </CardBody>
        </Card>
    )
}

export default AccountCard
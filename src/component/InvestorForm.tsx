import React, { FormEvent, useState } from 'react'
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from 'reactstrap'

interface Props {
    onSubmit: (amount: number) => void
}

const InvestorForm = ({ onSubmit }: Props) => {
    const [amount, setAmount] = useState<number>()

    const handleForm = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(amount!)
    }

    return <Card>
        <CardBody>
            <Form onSubmit={handleForm}>
                <FormGroup>
                    <Label>Amount</Label>
                    <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                </FormGroup>
                <FormGroup>
                    <Button type="submit">Open</Button>
                </FormGroup>
            </Form>
        </CardBody>
    </Card>
}

export default InvestorForm
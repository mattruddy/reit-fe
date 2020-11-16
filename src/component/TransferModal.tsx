import React, { FormEvent, useState } from 'react'
import { Button, Form, FormGroup, FormText, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { transferFunds } from '../data/api'
import { tokenState } from '../store'
import { Account } from '../utils/type'
import { currencyFormat } from '../utils/utils'

interface Props {
    isOpen: boolean 
    toggle: () => void
    account?: Account 
}

const TransferModal = ({isOpen, toggle, account}: Props) => {
    const token = useRecoilValue(tokenState)
    const [amount, setAmount] = useState<number>()
    const [confAmount, setConfAmount] = useState<number>()

    const onCancel = () => {
        setAmount(undefined)
        setConfAmount(undefined)
        toggle()
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (token && account && amount !== undefined && amount === confAmount 
            && amount <= account.balances.available) {
                transferFunds(token, account.accountId, amount)
                onCancel()
        }
    }

    return (
    <Modal isOpen={isOpen}>
        <Form onSubmit={onSubmit}>
        <ModalHeader>
            {account && account.name}
        </ModalHeader>
        <ModalBody>
                <FormGroup>
                    <Label>Amount to Transfer</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>$</InputGroupText>
                        </InputGroupAddon>
                        <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Amount</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>$</InputGroupText>
                        </InputGroupAddon>
                        <Input type="number" value={confAmount} onChange={(e) => setConfAmount(Number(e.target.value))} />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    { account && amount !== undefined && amount > account.balances.available && <FormText color="danger">Not Enough Money Available</FormText> }
                    { account && amount !== undefined && amount < account.balances.available 
                        && amount === confAmount &&  <FormText ><b>{currencyFormat.format(amount)} will be transfered to you Tross Account</b></FormText> }
                </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={amount === undefined 
                || confAmount === undefined
                || amount === 0 
                || confAmount !== amount}>Transfer</Button>
        </ModalFooter>
        </Form>
    </Modal>
    )
}

export default TransferModal
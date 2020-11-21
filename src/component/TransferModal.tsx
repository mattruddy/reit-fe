import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Form, FormGroup, FormText, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useRecoilState, useRecoilValue } from 'recoil'
import { transferFunds } from '../data/api'
import { investorState, tokenState, transactionState } from '../store'
import { currencyFormat, dateFormat, isNumeric } from '../utils/utils'

interface Props {
    isOpen: boolean 
    toggle: () => void
}

interface AccountOption {
    display: string 
    value: string
}

const TransferModal = ({isOpen, toggle}: Props) => {
    const token = useRecoilValue(tokenState)
    const investor = useRecoilValue(investorState)
    const [transactions, setTransactions] = useRecoilState(transactionState)
    const [transferDate, setTransferDate] = useState<string>(dateFormat(new Date()))
    const [amount, setAmount] = useState<string>()
    const [confAmount, setConfAmount] = useState<string>()
    const [options,setOptions] = useState<AccountOption[]>()
    const [to, setTo] = useState<string>()
    const [from, setFrom] = useState<string>()

    useEffect(() => {
        if (investor) {
            setOptions([
                {
                    display: `xxxx${investor.lastFourAccountNumber} - ${investor.bankName}`,
                    value: investor.lastFourAccountNumber
                } as AccountOption,
                {
                    display: `${investor.trossAccount} - Tross Account`,
                    value: investor.trossAccount
                } as AccountOption
            ])
        }
    }, [investor])

    const onCancel = () => {
        setAmount(undefined)
        setConfAmount(undefined)
        toggle()
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (token && amount !== undefined && amount === confAmount && transferDate && to && from) {
                const resp = await transferFunds(token, transferDate, Number(amount), to, from)
                if (transactions) {
                    setTransactions([resp, ...transactions])
                } else {
                    setTransactions([resp])
                }
                onCancel()
        }
    }

    return (
    <Modal isOpen={isOpen}>
        <Form onSubmit={onSubmit}>
        <ModalHeader>
            Transfer money
        </ModalHeader>
        <ModalBody>
            <FormGroup>
                <Label>From</Label>
                <Input value={from} type="select" onChange={(e) => setFrom(e.target.value)}>
                    <option disabled selected>Choose From Account</option>
                    {options?.map((opt, i) => (
                        <option value={opt.value} key={i}>{opt.display}</option>
                    ))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>To</Label>
                <Input value={to} type="select" onChange={(e) => setTo(e.target.value)}>
                    <option disabled selected>Choose To Account</option>
                    {options?.map((opt, i) => (
                        <option value={opt.value} key={i}>{opt.display}</option>
                    ))}
                </Input>
            </FormGroup>
           <FormGroup>
                    <Label>Date</Label>
                    <InputGroup>
                        <Input type="date" value={transferDate} onChange={(e) => setTransferDate(e.target.value)} />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label>Amount</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>$</InputGroupText>
                        </InputGroupAddon>
                        <Input value={amount} onChange={(e) => {
                            if (isNumeric(e.target.value)) {
                                setAmount(e.target.value)}
                            }
                        } />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Amount</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>$</InputGroupText>
                        </InputGroupAddon>
                        <Input value={confAmount} onChange={(e) => {
                            if (isNumeric(e.target.value)) {
                                setConfAmount(e.target.value)
                            }
                        }} />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    {amount && confAmount && amount === confAmount && <FormText>By clicking Transfer you are confirming that {<b>{currencyFormat.format(Number(amount))}</b>} will be transferred to your Tross account</FormText>}
                </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={amount === undefined 
                || confAmount === undefined
                || Number(amount) === 0 
                || confAmount !== amount}>Transfer</Button>
        </ModalFooter>
        </Form>
    </Modal>
    )
}

export default TransferModal
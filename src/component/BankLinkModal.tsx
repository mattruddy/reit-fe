import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { getBankFromRn } from '../data/api'
import { linkedTokenState, tokenState } from '../store'
import { bankType } from '../utils/type'

interface Props {
    isOpen: boolean
    toggle: () => void
}

const BankLinkModal = ({isOpen, toggle}: Props) => {
    const token = useRecoilValue(tokenState)
    const [rNumber, setRNumber] = useState<string>()
    const [bank, setBank] = useState<string>()
    const [bankType, setBankType] = useState<bankType>()
    const [aNumber, setANumber] = useState<string>()
    const [confirmNumber, setConfirmNumber] = useState<string>()

    useEffect(() => {
        if (rNumber && rNumber?.length === 9) {
            (async() => {
                const resp = await getBankFromRn(rNumber)
                if (resp.code === 200) {
                    setBank(resp.name)
                } else {
                    setBank(undefined)
                }
            })()
        }
    }, [rNumber])


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (bankType && rNumber && bank && aNumber && confirmNumber && aNumber === confirmNumber) {
            console.log(bankType)
            console.log(rNumber)
            console.log(aNumber)
            console.log(confirmNumber)
            console.log(bank)
        }
    }

    return (
        <Modal isOpen={true}>
            <Form onSubmit={handleSubmit}>
            <ModalBody>
            <FormGroup>
                <Label><b>Account Type</b></Label>
            <FormGroup check>
                <Label>
                    <Input type="radio" name="radio" value="CHECKING" onChange={(e) => setBankType(e.target.value as bankType)} />
                    Checking
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label>
                        <Input type="radio" name="radio" value="SAVING" onChange={(e) => setBankType(e.target.value as bankType)} />
                        Saving                    
                    </Label>
                </FormGroup>
                </FormGroup>
                <FormGroup>
                    <Label><b>Routing Number</b></Label>
                    <Input value={rNumber} onChange={(e) => setRNumber(e.target.value)} />
                    <FormText>{bank && bank}</FormText>
                </FormGroup>
                <FormGroup>
                    <Label><b>Account Number</b></Label>
                    <Input value={aNumber} onChange={(e) => setANumber(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label><b>Confirm Account Number</b></Label>
                    <Input value={confirmNumber} onChange={(e) => setConfirmNumber(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <FormText>
                    By selecting Agree & Link below, you are acknowledging that you have read and agree to the Terms & Conditions for adding the ACH feature to your account.
                    </FormText>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle}>Cancel</Button>
                <Button type="submit">{"Agree & Link"}</Button>
            </ModalFooter>
            </Form>
        </Modal>
    )
}

export default BankLinkModal
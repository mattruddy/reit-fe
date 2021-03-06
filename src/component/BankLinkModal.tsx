import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { getBankFromRn, linkBankAccount } from '../data/api'
import { investorState, isToastState, toastMessageState, tokenState } from '../store'
import { bankType } from '../utils/type'
import { isNumeric } from '../utils/utils'

interface Props {
    isOpen: boolean
    toggle: () => void
}

const BankLinkModal = ({isOpen, toggle}: Props) => {
    const token = useRecoilValue(tokenState)
    const setInvestor = useSetRecoilState(investorState)
    const [rNumber, setRNumber] = useState<string>('')
    const [rNumberError, setRNumberError] = useState<string>('')
    const [bank, setBank] = useState<string>('')
    const [bankType, setBankType] = useState<bankType>()
    const [aNumber, setANumber] = useState<string>('')
    const [confirmNumber, setConfirmNumber] = useState<string>('')
    const setIsToast = useSetRecoilState(isToastState)
    const setToastMessage = useSetRecoilState(toastMessageState)

    useEffect(() => {
        if (rNumber && rNumber?.length === 9) {
            (async() => {
                const resp = await getBankFromRn(rNumber)
                if (resp.code === 200) {
                    setBank(resp.name)
                    setRNumberError('')
                } else {
                    setBank('')
                    setRNumberError('Invalid Routing Number')
                }
            })()
        }
    }, [rNumber])


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (bankType && rNumber && bank && aNumber && confirmNumber && aNumber === confirmNumber) {
            try {
                const resp = await linkBankAccount(token!, bankType, bank, rNumber, aNumber)
                setInvestor(resp)
                onClose()
            } catch (error) {
                setToastMessage(error.response.data.message)
                setIsToast(true)
            }
        }
    }

    const onClose = () => {
        setANumber('')
        setBank('')
        setRNumber('')
        setConfirmNumber('')
        setBankType(undefined)
        setRNumberError('')
        toggle()
    }

    const valid = (): boolean => {
        return !!(aNumber && confirmNumber && bank && bankType &&
            aNumber === confirmNumber)
    }

    return (
        <Modal isOpen={isOpen}>
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
                    <Input value={rNumber} onChange={(e) => {
                        if (isNumeric(e.target.value) && e.target.value.length <= 9) {
                            setRNumber(e.target.value)}
                        }
                    } />
                    <FormText>{bank && bank}</FormText>
                <FormText color="danger">{rNumberError && rNumberError}</FormText>
                </FormGroup>
                <FormGroup>
                    <Label><b>Account Number</b></Label>
                    <Input value={aNumber} onChange={(e) => {
                        if (isNumeric(e.target.value)) {
                            setANumber(e.target.value)}
                        }
                    } />
                </FormGroup>
                <FormGroup>
                    <Label><b>Confirm Account Number</b></Label>
                    <Input value={confirmNumber} onChange={(e) => {
                        if (isNumeric(e.target.value)) {
                            setConfirmNumber(e.target.value)}
                        }
                     }/>
                </FormGroup>
                <FormGroup>
                    <FormText>
                    By selecting Agree & Link below, you are acknowledging that you have read and agree to the Terms & Conditions for adding the ACH feature to your account.
                    </FormText>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>Cancel</Button>
                <Button disabled={!valid()} type="submit">{"Agree & Link"}</Button>
            </ModalFooter>
            </Form>
        </Modal>
    )
}

export default BankLinkModal
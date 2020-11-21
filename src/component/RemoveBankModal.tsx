import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

interface Props {
    isOpen: boolean 
    toggle: () => void 
    onDelete: () => void
}
const RemoveBankModal = ({isOpen, toggle, onDelete}: Props) => {
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Remove Bank Account?</ModalHeader>
            <ModalBody>
                Removing this bank account will kill you
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle}>Cancel</Button>
                <Button onClick={onDelete}>Remove</Button>
            </ModalFooter>
        </Modal>
    )
}

export default RemoveBankModal
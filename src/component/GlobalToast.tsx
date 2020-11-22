import React from 'react'
import { Toast, ToastHeader, ToastBody } from 'reactstrap'
import { useRecoilState } from 'recoil'
import { isToastState, toastMessageState } from '../store'

const GlobalToast = () => {
    const [isToast, setIsToast] = useRecoilState(isToastState)
    const [toastMessage, setToastMessage] = useRecoilState(toastMessageState)
    const toggle = () => {
        setIsToast(!isToast)
        setToastMessage('')
    }

    return (
        <div className="GlobalToast">
            <Toast isOpen={isToast}>
                <ToastHeader toggle={toggle}>Message</ToastHeader>
                <ToastBody>
                    {toastMessage}
                </ToastBody>
            </Toast>
        </div>
    )
}

export default GlobalToast
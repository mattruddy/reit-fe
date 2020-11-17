import React, { FormEvent, useState } from 'react'
import { Button, Card, CardBody, Form, FormGroup, FormText, Input, Label } from 'reactstrap'
import { authType } from '../utils/const'
import { AuthResp } from '../utils/type'

interface Props {
    onSubmit: (username: string, password: string) => Promise<AuthResp>
    authType: authType
}

const AuthForm = ({onSubmit, authType}: Props) => {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [error, setError] = useState<string>()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (email && password) {
            const resp = await onSubmit(email!, password!)
            if (resp.status === "success") {
                setEmail(undefined)
                setPassword(undefined)
                setError(undefined)
            } else {
                setError(resp.data)
            }
        }
    }

    return (
        <Card>
            <CardBody>
            <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Button className="AuthButton" disabled={!email || !password} type="submit">{authType}</Button>
            </FormGroup>
            <FormGroup>
                {error && <FormText color="danger">{error}</FormText>}
            </FormGroup>
        </Form>
            </CardBody>

        </Card>
    )
}

export default AuthForm
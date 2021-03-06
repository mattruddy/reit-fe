import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { useSetRecoilState } from 'recoil'
import AuthForm from '../component/AuthForm'
import { login } from '../data/api'
import { tokenState, isLoggedInState } from '../store'
import { AUTH_TOKEN } from '../utils/const'
import { AuthResp } from '../utils/type'

const Login = () => {
    const setToken = useSetRecoilState(tokenState)
    const setLoggedIn = useSetRecoilState(isLoggedInState)

    const auth = async (email: string, password: string): Promise<AuthResp> => {
        const resp = await login(email, password)
        if (resp.token) {
            localStorage.setItem(AUTH_TOKEN, resp.token)
            setToken(resp.token)
            setLoggedIn(true)
            return { data: resp.token,  status: "success"} as AuthResp
        } else {
            return { data: resp,  status: "error"} as AuthResp
        }
    }
    
    return (
        <Container>
            <Row>
                <Col>
                    <div style={{padding: "16px"}}>
                        <h1>Log in</h1>
                    </div>
                    <AuthForm onSubmit={auth} authType="Log in" />
                    <div className="AuthFooter">
                        Want to be an Investor? <Link style={{marginLeft: "8px"}} to="/signup"> Sign up</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
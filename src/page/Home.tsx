import React from 'react'
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { profileState } from '../store'
import { currencyFormat } from '../utils/utils'

const Home = () => {
    const profile = useRecoilValue(profileState)

    return (
        <Container>
            <Row>
                <Col>
                    <div style={{padding: "16px"}}>
                        <h1><b>{currencyFormat.format(profile?.investor ? profile.investor.amount : 0)}</b></h1> 
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{padding: "16px", display: "flex", flexDirection: "column"}}>
                        <span>Total Earned</span>
                        <span><b>{currencyFormat.format(0)}</b></span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        <Card>
                            <CardBody>


                        <Table>
                            <th>Earnings</th>
                            <th>YTD</th>
                            <th>All Time</th>
                            <tbody>
                                <tr>
                                    <td>Dividends</td>
                                    <td>{currencyFormat.format(0)}</td>
                                    <td>{currencyFormat.format(0)}</td>
                                </tr>
                                <tr>
                                    <td>Appreciation</td>
                                    <td>{currencyFormat.format(0)}</td>
                                    <td>{currencyFormat.format(0)}</td>
                                </tr>
                                <tr>
                                    <td>Advisory Fees</td>
                                    <td>{currencyFormat.format(0)}</td>
                                    <td>{currencyFormat.format(0)}</td>
                                </tr>
                            </tbody>
                        </Table>
                        </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
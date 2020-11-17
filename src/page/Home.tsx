import React from 'react'
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { investorState, transactionState } from '../store'
import { currencyFormat, dateFormat } from '../utils/utils'
import {FcLeft, FcRight} from 'react-icons/fc'
import { Transaction } from '../utils/type'

const Home = () => {
    const investor = useRecoilValue(investorState)
    const transactions = useRecoilValue(transactionState)

    const getPendingAmount = (trans: Transaction[]): number => {
        return trans
            .filter(t => t.transferStatus === "PENDING")
            .flatMap(t => t.amount)
            .reduce((l, r) => l + r)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div style={{padding: "16px"}}>
                        <h1><b>{currencyFormat.format(investor ? investor.amount : 0)}</b></h1> 
                        {transactions && transactions.find(t => t.transferStatus === "PENDING") && <span><i>Pending: {currencyFormat.format(investor!.amount + getPendingAmount(transactions))}</i></span> }
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
            <Row>
                <Col>
                    <div style={{padding: "16px"}}>
                        Transactions
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Table>
                                <th>Amount</th>
                                <th></th>
                                <th>Status</th>
                                <th>Date</th>
                                <tbody>
                                    {transactions && transactions.map((trans, i) => (
                                        <tr key={i}>
                                            <td>{currencyFormat.format(trans.amount)}</td>
                                            <td>{trans.transactionType === "DEBIT" ? 
                                                <FcRight size={25} className="DebitArrow" /> : <FcLeft className="CreditArrow" size={25} />}</td>
                                            <td>{trans.transferStatus}</td>
                                            <td>{dateFormat(trans.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
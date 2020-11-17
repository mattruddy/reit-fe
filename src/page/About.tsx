import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'

const About = () => {
    return (
        <Container>
            <h1 style={{padding: "16px"}}>About Tross Partners</h1>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <p>
                            Tross Partners has acquired, transacted and managed everything from Multifamily, Residential and Commercial Real Estate since early 2014. 
                            Over the years, a great relationship has been build up with lenders across the country due 
                            to our excellent investment reputation. The key to our success is keeping it simple, we do not 
                            waste time with long negotiations and trying to get the best price for a property, but rather, 
                            developed a curtain buying criteria for properties and hold them for the long-term. If a property 
                            matches our criteria at a fair price, we will close quickly and move on to the next.
                            </p>
                            <p>
                            At Tross Capital, we take a lot of pride in our technology team. It is one of the only Real Estate 
                            firms to also compete in the Financial Technology space. Our engineering team works extensively on 
                            building advanced algorithms using Artificial Intelligence and Machine Learning to help the company 
                            forecast investments for its long-term investments. This is a very important aspect, as it analyzes 
                            terabytes of demographics data to detect areas on the rise with tremendous growth potential. It is a 
                            crucial component in the decision making process.
                            </p>
                            <p>
                            This company is always open to taking on new project and investors. The passion of members on the team 
                            is off the charts as they often host local events to discuss upcoming trends, growing industries and 
                            guest speakers. The company enjoys helping and connecting with people all around the country with similar 
                            interests. Tross Capital takes a lot of pride in their diverse portfolio and never afraid to take on any 
                            project that catches their eye. Feel free to contact us if you have a property you would like to sell or 
                            are a potential investor.
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs="12" md="4">
                    <Card>
                        <CardBody>
                            <div className="AboutCardBottom">
                                <b>$2MM+</b>
                                <i>Equity Capital Invested</i>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" md="4">
                    <Card>
                        <CardBody>
                            <div className="AboutCardBottom">
                                <b>$3MM+</b>
                                <i>Transactions Closed</i>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" md="4">
                    <Card>
                        <CardBody>
                            <div className="AboutCardBottom">
                                <b>8% - 13%</b>
                                <i>Average Yearly ROI</i>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default About
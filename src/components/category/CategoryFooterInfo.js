import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const footerInfo = [
    {
        id: 1,
        title: "Terms",
        content: "Whatever you need to simplify your to do list, no matter your budget."
    },
    {
        id: 2,
        title: "Timeline",
        content: "Find services based on your goals and deadlines, it’s that simple."
    },
    {
        id: 3,
        title: "Safety",
        content: "Your payment is always secure, Fiverr is built to protect your peace of mind."
    }
]
function CategoryFooterInfo() {
    return (
        <div className="full-bg-wapper">
            <Container>
                <Row>
                    {
                        footerInfo?.map((info, index) => {
                            return (
                                <Col key={index}>
                                    <h2>
                                        <span>Your</span> {info.title}
                                    </h2>
                                    <p>{info.content}</p>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </div>
    )
}

export default CategoryFooterInfo

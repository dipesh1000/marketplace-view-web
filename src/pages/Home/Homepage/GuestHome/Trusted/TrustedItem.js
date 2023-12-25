import React from 'react'
import { Col } from 'react-bootstrap'

function TrustedItem({logo, logoTitle}) {
    return (
        <div>
            <Col md="auto">
                <img src={logo} alt={logoTitle} />
            </Col>
        </div>
    )
}

export default TrustedItem

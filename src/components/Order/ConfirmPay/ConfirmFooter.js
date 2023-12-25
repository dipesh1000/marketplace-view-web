import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ConfirmFooter() {
    return (
        <div className="ConfirmFooter">
            <Container>
                <span className="ConfirmFooterText">Payments are processed by Fiverr International Ltd., Fiverr Limited, and Fiverr Inc. See
                    <Link to="/">Payment Terms</Link>
                </span>
            </Container>
        </div>
    )
}

export default ConfirmFooter

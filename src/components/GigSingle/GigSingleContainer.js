import React from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import GigSingleContent from './GigSingleContent'
import GigSingleSideBar from './GigSingleSideBar'

function GigSingleContainer() {

  const [values, setValues] = useState({});

    return (
        <>
          <div className="GigSingleContainerWrapper">
            <Container>
                <Row>
                    <Col md={7}>
                        <GigSingleContent values={values} setValues={setValues} />
                    </Col>
                    <Col md={{span: 4, offset: 1}}>
                        <GigSingleSideBar values={values} />
                    </Col>
                </Row>
            </Container>
          </div>
        </>
    )
}

export default GigSingleContainer

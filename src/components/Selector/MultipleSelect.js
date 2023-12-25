import React from 'react';
import { Form } from 'react-bootstrap';

function MultipleSelect() {
    return (
        <div>
            <Form.Control as="select" custom>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Form.Control>
        </div>
    )
}

export default MultipleSelect

import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FiFilePlus } from "react-icons/fi";

function PrivateNote() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className="sideBarNote">
      <Card>
        <Card.Body>
          <div className="sideBarCardHeader">
            <h6>Private Note</h6>
            <span>Only visible to you</span>
            <hr />
            {!openForm ? (
              <Button onClick={() => setOpenForm(!openForm)}>
                <FiFilePlus />
                Add note
              </Button>
            ) : (
              <Form>
                <Form.Control as="textarea" rows={6} />
                <span className="d-block pt-1 text-right">
                  0/1200 characters
                </span>
                <div className="noteBtns">
                  <Button
                    className="noteBtn ncancel"
                    onClick={() => setOpenForm(!openForm)}
                  >
                    Cancel
                  </Button>
                  <Button className="noteBtn nsave">Save</Button>
                </div>
              </Form>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PrivateNote;

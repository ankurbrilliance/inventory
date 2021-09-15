import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./Thickness.css";

const Thickness = (props) => {
  return (
    <>
      <Modal show={props.show}>
        <Modal.Header closeButton={props.hadnleClose}>
          <Modal.Title>COn</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "blue" }}>
          <div className="d-flex container">
            <div className="row">
              <div className="col-md-3">
                <input
                  className="modals_input pl-4"
                  type="number"
                  min="0"
                  placeholder="feet"
                />
              </div>

              <div className="col-md-3">
                <input
                  className="modals_input pl-4"
                  type="number"
                  min="0"
                  placeholder="inches"
                />
              </div>
              <div className="col-md-1 pt-2">
                <p>=</p>
              </div>
              <div className="col-md-3">
                <input
                  className="modals_input"
                  type="text"
                  placeholder="Thickness"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal_button">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Thickness;

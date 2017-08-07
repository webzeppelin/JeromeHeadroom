import React from "react";
import { connect } from "react-redux";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export class Transcript extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup controlId="transcript">
              <ControlLabel>TRANSCRIPT:</ControlLabel>
              <FormControl componentClass="textarea" readOnly placeholder="Say something to Jerome above to begin..." rows={8} />
              <FormControl.Feedback />
            </FormGroup>
        );
    }
}

export default Transcript = connect()(Transcript);

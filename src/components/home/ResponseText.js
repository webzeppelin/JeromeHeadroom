import React from "react";
import { connect } from "react-redux";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export class ResponseText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { responseText, waitingForResponse } = this.props;
        let value = waitingForResponse ? "Waiting for response..." : responseText;
        return (
            <FormGroup controlId="responseText">
              <ControlLabel>RESPONSE:</ControlLabel>
              <FormControl componentClass="textarea" readOnly placeholder="Say something to Jerome above to begin..." rows={4} value={value} />
              <FormControl.Feedback />
            </FormGroup>
        );
    }
}

function mapStateToProps(state) {
  return {
    responseText: state.response.responseText,
    waitingForResponse: state.response.waitingForResponse,
  };
}

export default ResponseText = connect(mapStateToProps)(ResponseText);

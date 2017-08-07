import React from "react";
import { connect } from "react-redux";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export class Transcript extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { entries } = this.props;
        let value = this.buildValue(entries);
        return (
            <FormGroup controlId="transcript">
              <ControlLabel>TRANSCRIPT:</ControlLabel>
              <FormControl componentClass="textarea" readOnly value={value} placeholder="Say something to Jerome above to begin..." rows={8} />
              <FormControl.Feedback />
            </FormGroup>
        );
    }

    buildValue(entries) {
        let map = entries.map((entry, index) => {
            return entry.speaker + ": " + entry.text;
        });
        return map.join('\n');
    }
}

function mapStateToProps(state) {
  return {
    entries: state.transcript.entries,
  };
}
export default Transcript = connect(mapStateToProps)(Transcript);

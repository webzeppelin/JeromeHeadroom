import React from "react";
import { connect } from "react-redux";
import { FormGroup, FormControl, Modal, Button } from "react-bootstrap";

export class Transcript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    }
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  render() {
    const { entries } = this.props;
    let value = this.buildValue(entries);
    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={this.openModal}
        >
          View Transcript
        </Button>
        <Modal show={this.state.modalOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Transcript:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="transcript">
              <FormControl componentClass="textarea" readOnly value={value} placeholder="Say something to Jerome above to begin..." rows={8} />
            </FormGroup>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    this.setState({ modalOpen: true });
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

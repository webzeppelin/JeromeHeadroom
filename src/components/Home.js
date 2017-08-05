import React from "react";
import { connect } from "react-redux";
import { Row, Col, FormGroup, FormControl, Button, Glyphicon, Image, ControlLabel } from "react-bootstrap";

// Home page component
export class Home extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <div>
        <Row>
          <Col xs={12} md={6}>
            <FormGroup controlId="formControlsTextarea">
              <FormControl componentClass="textarea" placeholder="Say something to Jerome..." />
              <Button bsStyle="primary">SEND <Glyphicon glyph="play"/></Button>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Your Conversation...</ControlLabel>
              <FormControl componentClass="textarea" readOnly placeholder="Say something to Jerome to begin..." rows={8} />
            </FormGroup>
          </Col>
          <Col xs={12} md={6}>
            <Image src="/media/jerome_headroom_placeholder.png" responsive />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(Home);

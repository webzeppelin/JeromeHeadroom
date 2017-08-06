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
            <FormGroup controlId="enterForm">
              <FormControl componentClass="textarea" placeholder="Say something to Jerome..." rows={4}/>
              <div className="ra-button-bar">
                <Button>SPEAK <Glyphicon glyph="bullhorn"/></Button><Button>CLEAR <Glyphicon glyph="remove"/></Button><Button bsStyle="primary">SEND <Glyphicon glyph="play"/></Button>
              </div>
            </FormGroup>
            <FormGroup controlId="transcript">
              <ControlLabel>CONVERSATION:</ControlLabel>
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

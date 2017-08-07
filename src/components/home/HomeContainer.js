import React from "react";
import { connect } from "react-redux";
import { Row, Col, FormGroup, FormControl, Button, Glyphicon, Image, ControlLabel } from "react-bootstrap";
import { sendInput, requestSpeech } from "../../action";
import { UserInputForm } from "./UserInputForm";
import { Transcript } from "./Transcript";
import { TalkingHead } from "./TalkingHead";
import { ResponseText } from "./ResponseText";

// Home page component
export class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} md={6}>
            <TalkingHead />
          </Col>
          <Col xs={12} md={6}>
            <UserInputForm />
            <ResponseText />
            <Transcript />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(HomeContainer);

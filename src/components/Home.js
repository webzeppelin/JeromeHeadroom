import React from "react";
import { connect } from "react-redux";
import { Row, Col, FormGroup, FormControl, Button, Glyphicon, Image, ControlLabel } from "react-bootstrap";
import { sendInput, requestSpeech } from "../action";
import { UserInputForm } from "./home/UserInputForm";
import { Transcript } from "./home/Transcript";
import { TalkingHead } from "./home/TalkingHead";

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
            <UserInputForm />
            <Transcript />
          </Col>
          <Col xs={12} md={6}>
            <TalkingHead />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(Home);

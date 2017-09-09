import React from "react";
import { connect } from "react-redux";
import { Row, Col, Panel } from "react-bootstrap";
import { UserInputForm } from "./UserInputForm";
import { Transcript } from "./Transcript";
import { TalkingHead } from "./TalkingHead";
import { RequestText } from "./RequestText";
import { ResponseText } from "./ResponseText";
import { ButtonBar } from "./ButtonBar";

// Home page component
export class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel>
        <Row>
          <Col xs={12} md={6}>
              <TalkingHead />
          </Col>
          <Col xs={12} md={6}>
            <ButtonBar textInput={false} />
            <UserInputForm />
            <RequestText />
            <ResponseText />
            <Transcript />
          </Col>
        </Row>
      </Panel>
    );
  }
}

export default connect()(HomeContainer);

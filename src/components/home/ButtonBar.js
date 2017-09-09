import React from "react";
import { connect } from "react-redux";
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from "react-bootstrap";
import { startListening, stopListening, speakResponse, openTextInput, closeTextInput } from "../../action";

export class ButtonBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleReplay = this.handleReplay.bind(this);
  }
  render() {
    const { speechRecogRunning } = this.props;
    return (
      <ButtonToolbar>
        <ButtonGroup bsSize="large">
          { this.renderTalkButton() }
          { this.renderTypeButton() }
          { this.renderReplayButton() }
        </ButtonGroup>
      </ButtonToolbar>
    );
  }

  renderTalkButton() {
    const { speechRecogRunning } = this.props;
    if (speechRecogRunning) {
      return (
        <Button
          bsStyle="success"
          onClick={() => {this.props.dispatch(stopListening())}}>
            <Glyphicon glyph="stop"/> Talk
        </Button>
      );
    } else {
      return (
        <Button
          bsStyle="primary"
          onClick={() => {this.props.dispatch(startListening())}}>
            <Glyphicon glyph="play"/> Talk
        </Button>
      );
    }
  }

  renderTypeButton() {
    const { textInputOpen } = this.props;
    if (textInputOpen) {
      return (
        <Button
          bsStyle="success"
          onClick={() => {this.props.dispatch(closeTextInput())}}>
          <Glyphicon glyph="hand-up"/> Type
        </Button>
      );
    } else {
      return (
        <Button
          bsStyle="primary"
          onClick={() => {this.props.dispatch(openTextInput())}}>
          <Glyphicon glyph="hand-down"/> Type
        </Button>
      );
    }
  }

  renderReplayButton() {
    const { isSpeaking, waitingForResponse } = this.props;
    return (
      <Button
        bsStyle="primary"
        onClick={this.handleReplay} disabled={waitingForResponse || isSpeaking}>
        <Glyphicon glyph="repeat"/> Replay
      </Button>
    );
  }

  handleReplay() {
    const { responseText, waitingForResponse } = this.props;
    if (waitingForResponse) return;
    this.props.dispatch(speakResponse(responseText));
  }
}

function mapStateToProps(state) {
  return {
    speechRecogRunning: state.speechInput.speechRecogRunning,
    responseText: state.response.responseText,
    waitingForResponse: state.response.waitingForResponse,
    isSpeaking: state.talkingHead.isSpeaking,
    textInputOpen: state.home.textInputOpen,
  };
}

export default ButtonBar = connect(mapStateToProps)(ButtonBar);

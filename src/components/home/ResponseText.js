import React from "react";
import { connect } from "react-redux";
import { Panel, ControlLabel, Button } from "react-bootstrap";
import { speakResponse } from "../../action"

export class ResponseText extends React.Component {
  constructor(props) {
    super(props);

    this.handleSayItAgain = this.handleSayItAgain.bind(this);
  }

  render() {
    const { responseText, waitingForResponse, isSpeaking, currentCharIndex } = this.props;
    return (
      <div>
        <ControlLabel>RESPONSE:</ControlLabel>
        <div>
          { this.renderValue(responseText, waitingForResponse, isSpeaking, currentCharIndex) }
          <div className="ra-button-bar">
            <Button onClick={this.handleSayItAgain} disabled={waitingForResponse || isSpeaking}>Say It Again</Button>
          </div>
        </div>
      </div>
        );
  }

  renderValue(responseText, waitingForResponse, isSpeaking, currentCharIndex) {
    if (!waitingForResponse && isSpeaking) {
      let prefix = "";
      if (currentCharIndex > 0) {
        prefix = responseText.substring(0,currentCharIndex);
      }
      let nextBoundary = responseText.indexOf(" ", currentCharIndex);
      let strongWord = nextBoundary > -1 ? responseText.substring(currentCharIndex, nextBoundary) : responseText.substring(currentCharIndex);
      let suffix = "";
      if (nextBoundary > -1) {
        suffix = responseText.substring(nextBoundary);
      }
      return (
        <p>
          { prefix }<strong>{ strongWord }</strong>{ suffix }
        </p>
      );
    }
    return (
      <p>
        { waitingForResponse ? "Waiting for response..." : responseText }
      </p>
    )
  }

  handleSayItAgain() {
    const { responseText, waitingForResponse } = this.props;
    if (waitingForResponse) return;
    this.props.dispatch(speakResponse(responseText));
  }
}

function mapStateToProps(state) {
  return {
    responseText: state.response.responseText,
    waitingForResponse: state.response.waitingForResponse,
    isSpeaking: state.talkingHead.isSpeaking,
    currentWordIndex: state.talkingHead.currentWordIndex,
    currentCharIndex: state.talkingHead.currentCharIndex,
  };
}

export default ResponseText = connect(mapStateToProps)(ResponseText);

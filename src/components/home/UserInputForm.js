import React from "react";
import { connect } from "react-redux";
import { FormGroup, FormControl, Button, Glyphicon, ControlLabel } from "react-bootstrap";
import { sendInput, setInput, requestSpeech } from "../../action"

export class UserInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSend = this.handleInputSend.bind(this);
    this.handleInputClear = this.handleInputClear.bind(this);
    this.handleInputSpeak = this.handleInputSpeak.bind(this);
  }

  render() {
    const { inputText, waitingForResponse, waitingForSpeech} = this.props;
    return (
      <FormGroup controlId="enterForm">
        <FormControl componentClass="textarea" placeholder="Say something to Jerome..." rows={4} value={inputText} onChange={this.handleInputChange} inputRef={(ref) => { this.inputText = ref }} />
        <div className="ra-button-bar">
          <Button onClick={this.handleInputSpeak}>SPEAK <Glyphicon glyph="bullhorn" /></Button>
          <Button onClick={this.handleInputClear}>CLEAR <Glyphicon glyph="remove" /></Button>
          <Button bsStyle="primary" onClick={this.handleInputSend}>SEND <Glyphicon glyph="play" /></Button>
        </div>
      </FormGroup>
    );
  }

  handleInputChange(event) {
    let input = event.target.value;
    this.props.dispatch(setInput(input));
  }

  handleInputSend(event) {
    const { inputText } = this.props;
    console.log("Input text = " + inputText);
    this.props.dispatch(sendInput(inputText));
    this.props.dispatch(setInput(''));
  }

  handleInputClear(event) {
    console.log("Clear called");
    this.props.dispatch(setInput(''));
  }

  handleInputSpeak(event) {
    console.log("Requesting speech");
    this.props.dispatch(requestSpeech());
  }
}

function mapStateToProps(state) {
  return {
    inputText: state.userInputForm.inputText,
    waitingForSpeech: state.userInputForm.waitingForSpeech,
    waitingForResponse: state.userInputForm.waitingForResponse,
  };
}

export default UserInputForm = connect(mapStateToProps)(UserInputForm);

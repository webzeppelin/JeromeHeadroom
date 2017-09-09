import React from "react";
import { connect } from "react-redux";
import { ControlLabel } from "react-bootstrap";

export class RequestText extends React.Component {

  render() {
    const { requestText, requestTextFinal } = this.props;
    if (requestText) {
      return (
        <div className="speechBoxRight">
          {this.renderValue(requestText, requestTextFinal)}
        </div>
      );
    } else {
      return <div></div>
    }
  }

  renderValue(requestText, requestTextFinal) {
    let pClass = requestTextFinal ? "finalRequest" : "interimRequest";
    return (
      <p className={pClass}>
        {requestText}
      </p>
    );
  }
}

function mapStateToProps(state) {
  return {
    requestText: state.request.requestText,
    requestTextFinal: state.request.requestTextFinal,
  };
}

export default RequestText = connect(mapStateToProps)(RequestText);

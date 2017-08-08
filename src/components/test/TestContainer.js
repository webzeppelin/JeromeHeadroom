import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Button, Table } from "react-bootstrap";
import { TestSurface } from "./TestSurface";

export class TestContainer extends React.Component {

  constructor(props) {
    super(props);

    // bind <this> to the event method
    this.handleButton1 = this.handleButton1.bind(this);
  }

  componentWillMount() {
    console.log("Debug: Test component will mount");
  }

  render() {
    const { prop1 } = this.props;

    return (
      <div>
        <h2>Testing Page</h2>
        <TestSurface />
        <Button onClick={this.handleButton1}>Do Nothing</Button>
      </div>
    );
  }

  handleButton1() {
    console.log("HANDLING BUTTON 1")
  }


}

function mapStateToProps(state) {
  return {
    prop1: state.test.state1,
  };
}
export default connect(mapStateToProps)(TestContainer);

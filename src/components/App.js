import React from "react";
// import "../stylesheets/main.scss";
import { connect } from "react-redux";
import { Row, Col, Nav, NavItem, PageHeader, Panel } from "react-bootstrap";

// app component
export class App extends React.Component {
  componentWillMount() {
    console.log("Debug: App component will mount");
  }

  // render
  render() {
    return (
      <div className="container">
        <PageHeader>Jerome Headroom</PageHeader>
        <Nav bsStyle="pills">
          <NavItem eventKey="home" href="/">Home</NavItem>
          <NavItem eventKey="test" href="/test">Test</NavItem>
        </Nav>
        <Panel>
          {this.props.children}
        </Panel>
      </div>
          );
  }
}

export default connect()(App);
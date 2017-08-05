import React from "react";
import "../stylesheets/main.scss";
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
        <PageHeader>JEROME HEADROOM</PageHeader>
        {this.props.children}
      </div>
          );
  }
}

export default connect()(App);
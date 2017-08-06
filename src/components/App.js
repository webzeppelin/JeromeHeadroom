import React from "react";
import "../stylesheets/main.scss";
import { connect } from "react-redux";
import { app_router } from "../router";
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
        { app_router }
        {/* {this.props.children} */}
      </div>
          );
  }
}

export default App = connect()(App);
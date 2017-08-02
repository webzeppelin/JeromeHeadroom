import React from "react";
import { connect } from "react-redux";
import { Table, Pagination } from "react-bootstrap";

// Home page component
export class Home extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <div>
        <h2>This is the home page</h2>
        <p>Blow this out into something.</p>
      </div>
    );
  }
}

export default connect()(Home);

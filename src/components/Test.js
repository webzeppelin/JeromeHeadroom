import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Button, Table } from "react-bootstrap";

// Home page component
export class Test extends React.Component {

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
                <Button onClick={this.handleButton1}>
                    Button 1
                </Button>
            </div>
        );
    }

    handleButton1() {
        console.log("HANDLING BUTTON 1")
    }

    
}

// export the connected class
function mapStateToProps(state) {
    return {
        prop1: state.test.state1,
    };
}
export default connect(mapStateToProps)(Test);

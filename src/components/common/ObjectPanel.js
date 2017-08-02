import React from "react";
import { connect } from "react-redux";
import { Panel, Row, Col } from "react-bootstrap";

export class ObjectPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, obj, loaded } = this.props;
        if (!loaded) {
            return (
                <Panel header={title}>
                    <Row>
                        <Col xs={12}>Loading...</Col>
                    </Row>
                </Panel>
            );
        }
        if (!obj) {
            return (
                <Panel header={title}>
                    <Row>
                        <Col xs={12}>Undefined</Col>
                    </Row>
                </Panel>
            );
        }
        return (
            <Panel header={title}>
                { Object.keys(obj).map((key, index) => (
                        <Row key={index}>
                            <Col xs={6}><label>{key}</label></Col>
                            <Col xs={6}>{obj[key]}</Col>
                        </Row>
                    )
                )}
            </Panel>
        );
        
    }
}

export default ObjectPanel = connect()(ObjectPanel);
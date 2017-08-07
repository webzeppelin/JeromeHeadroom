import React from "react";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";

export class TalkingHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Image src="/media/jerome_headroom_placeholder.png" responsive />
            </div>
        );
    }
}

export default TalkingHead = connect()(TalkingHead);

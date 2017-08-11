import React from "react";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";

export class TalkingHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { mouthOpen, isSpeaking } = this.props;
        let img_src = mouthOpen ? "/media/jerome-open-trans.png" : "/media/jerome-closed-trans.png";
        return (
            <div>
                <Image src={img_src} responsive />
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    mouthOpen: state.talkingHead.mouthOpen,
    isSpeaking: state.talkingHead.isSpeaking,
  };
}

export default TalkingHead = connect(mapStateToProps)(TalkingHead);

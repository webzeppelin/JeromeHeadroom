import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import { Image } from "react-bootstrap";
import { Layer, Rect, Line, Stage, Group, Image } from 'react-konva';
import SizeMe from 'react-sizeme';

export class TalkingHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closedFrame: null,
      closedFrameLoaded: false,
      openFrame: null,
      openFrameLoaded: false,
    };
  }

  componentDidMount() {
    console.log("Preloading frame images");
    // the closed frame
    let img1 = this.preloadImage("/media/jerome-closed-trans.png", () => {
      console.log("closed frame loaded");
      this.setState({ closedFrameLoaded: true });
    });
    let img2 = this.preloadImage("/media/jerome-open-trans.png", () => {
      console.log("open frame loaded");
      this.setState({ openFrameLoaded: true });
    });

    this.setState({
      closedFrame: img1,
      openFrame: img2,
    });
  }

  render() {
    const { mouthOpen, isSpeaking, size } = this.props;
    //const { width, height } = size;
    let width = size.width;
    let height = width;
    // let height = 400;
    // if (this.props.size) {
    //   console.log("Got size from SizeMe");
    //   width = this.props.size.width;
    //   height = this.props.size.height;
    // }
    return (
      <Stage width={width} height={height}>
        <Layer>
          {this.renderBackground(width, height)}
          {this.renderLines(width, height)}
          {this.renderFrame(width, height, mouthOpen)}
        </Layer>
      </Stage>
    );
  }

  renderBackground(width, height) {
    return (
      <Rect
        x={0} y={0} width={width} height={height}
        fill='black'
      />
    );
  }

  renderLines(width, height) {
    let lines = this.generateLines(width, height, 20);
    return lines.map(
      (line, index) => (
        <Line key={index}
          stroke='red' strokeWidth={3} points={line}
        />
      )
    );
  }

  renderFrame(width, height, mouthOpen) {
    let frameImageLoaded = mouthOpen ? this.state.openFrameLoaded : this.state.closedFrameLoaded;
    let frameImage = mouthOpen ? this.state.openFrame : this.state.closedFrame;
    if (frameImageLoaded) {
      return (
        <Image x={0} y={0} width={width} height={height} image={frameImage} />
      );
    }
  }

  generateLines(width, height, numdivs) {
    let ret = [];
    let spacing = height / numdivs;
    let offset = spacing / 2;
    for (let i = 0; i < numdivs; i++) {
      let y = offset + i * spacing;
      ret.push([0, y, width - 1, y])
    }
    return ret;
  }

  preloadImage(srcPath, onLoad) {
    let img = document.createElement("img");
    img.src = srcPath;
    img.onload = onLoad;
    return img;
  }
}

function mapStateToProps(state) {
  return {
    mouthOpen: state.talkingHead.mouthOpen,
    isSpeaking: state.talkingHead.isSpeaking,
  };
}

export default TalkingHead = compose(
  SizeMe(),
  connect(mapStateToProps),
)(TalkingHead);

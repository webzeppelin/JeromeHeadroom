import React from "react";
import { connect } from "react-redux";
// import { Image } from "react-bootstrap";
// import { Rect } from "react-retina";
import { Layer, Rect, Line, Stage, Group, Image } from 'react-konva';

export class TestSurface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: null,
      frameLoaded: false,
    };
  }

  componentDidMount() {
    console.log("Preloading frame image");
    var img = document.createElement("img");
    img.src = "/media/jerome_headroom_trans.png";
    img.onload = () => {
      console.log("image onload called");
      this.setState({frameLoaded: true});
    };
    this.setState({
      frame: img,
      frameLoaded: false,
    });
  }

  render() {
    let width = 666;
    let height = 666;
    return (
      <Stage width={width} height={height}>
        <Layer>
          {this.renderBackground(width, height)}
          {this.renderLines(width, height)}
          {this.renderFrame(width, height)}
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

  renderFrame(width, height) {
    if (this.state.frameLoaded) {
      return (
        <Image x={0} y={0} width={width} height={height} image={this.state.frame}/>
      );
    }
  }

  frameLoaded

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
}

export default TestSurface = connect()(TestSurface);

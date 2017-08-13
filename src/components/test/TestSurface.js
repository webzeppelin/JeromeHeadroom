import React from "react";
import { connect } from "react-redux";
// import { Image } from "react-bootstrap";
// import { Rect } from "react-retina";
import { Layer, Rect, Line, Stage, Group, Image } from 'react-konva';

const cube = [
  [-500, -500, -500],
  [500, -500, -500],
  [500, 500, -500],
  [-500, 500, -500],
  [-500, -500, 500],
  [500, -500, 500],
  [500, 500, 500],
  [-500, 500, 500]
];

export class TestSurface extends React.Component {
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
    var img1 = document.createElement("img");
    img1.src = "/media/jerome-closed-trans.png";
    img1.onload = () => {
      console.log("image1 onload called");
      this.setState({closedFrameLoaded: true});
    };
    // the open frame
    var img2 = document.createElement("img");
    img2.src = "/media/jerome-open-trans.png";
    img2.onload = () => {
      console.log("image2 onload called");
      this.setState({openFrameLoaded: true});
    };
    this.setState({
      closedFrame: img1,
      openFrame: img2,
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
    if (this.state.closedFrameLoaded) {
      return (
        <Image x={0} y={0} width={width} height={height} image={this.state.closedFrame}/>
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

  project3DPointToPlane(point, planePoint, planeNormal) {
    let t = (planeNormal[0]*planePoint[0] - planeNormal[0]*point[0]
      + planeNormal[1]*planePoint[1] - planeNormal[1]*point[1]
      + planeNormal[2]*planePoint[2] - planeNormal[2]*point[2])
      / (planeNormal[0]*planeNormal[0] + planeNormal[1]*planeNormal[1] + planeNormal[2]*planeNormal[2]);
    return [
      point[0] + t*planeNormal[0],
      point[1] + t*planeNormal[1],
      point[2] + t*planeNormal[2],
    ];
  }
}

export default TestSurface = connect()(TestSurface);

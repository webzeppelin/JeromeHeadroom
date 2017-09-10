import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Mat44, Mat33, Vec4, Vec3 } from "alfador";
import { Layer, Rect, Line, Stage, Group, Image } from 'react-konva';
import SizeMe from 'react-sizeme';
import * as Action from "../../action";

export class TalkingHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closedFrame: null,
      closedFrameLoaded: false,
      openFrame: null,
      openFrameLoaded: false,
      spokeGreeting: false,
    };

    this.opM = this.generateOrthographicProjectionMatrix();
  }

  componentDidMount() {
    console.log("Preloading frame images");
    // the closed frame
    let img1 = this.preloadImage("media/jerome-closed-trans.png", () => {
      console.log("closed frame loaded");
      this.setState({ closedFrameLoaded: true });
      if (this.state.openFrameLoaded && !this.state.spokeGreeting) {
        this.props.dispatch(Action.speakResponse(this.props.responseText));
      }
    });
    let img2 = this.preloadImage("media/jerome-open-trans.png", () => {
      console.log("open frame loaded");
      this.setState({ openFrameLoaded: true });
      if (this.state.closedFrameLoaded && !this.state.spokeGreeting) {
        this.props.dispatch(Action.speakResponse(this.props.responseText));
      }
    });

    this.setState({
      closedFrame: img1,
      openFrame: img2,
    });

    this.props.dispatch(Action.startHeadBackgroundAnimation());
  }

  componentWillUnmount() {
    console.log("Stopping head background animation");
    this.props.dispatch(Action.stopHeadBackgroundAnimation());
  }

  render() {
    const { mouthOpen, isSpeaking, size } = this.props;
    //const { width, height } = size;
    const width = size.width;
    const height = width;
    
    return (
      <Stage width={width} height={height}>
        <Layer>
          {this.renderBackground(width, height)}
          {this.renderBackgroundLines(width, height)}
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

  renderBackgroundLines(width, height) {
    const { phi, theta, psi } = this.props;
    let cube = getRotatedCube(phi, theta, psi);
    let ret = [];
    for (let side=0; side<cubeSides.length; side++) {
      let lines =  this.generateSideLines(cube, 25, cubeSides[side], width, height);
      ret.push(...this.renderCubeSide(lines, cubeSideColors[side]));
    }
    return ret;
  }

  renderCubeSide(lines, color) {
    return lines.map(
      (line, index) => (
        <Line key={color+index}
          stroke={color} strokeWidth={3} points={line}
        />
      )
    );
  }

  generateSideLines(cube, spacing, cornerIndexes, width, height) {
    let ret = [];
    let guideStart = new Vec3(cube[cornerIndexes[0]]);
    let guideEnd = new Vec3(cube[cornerIndexes[1]]);
    let guideV = guideEnd.sub(guideStart);
    let guideUnitV = guideV.normalize();
    let guideLength = guideV.length();
    let distance = 0;
    while (distance < guideLength) {
      let modelPt1 = (new Vec3(cube[cornerIndexes[0]])).add(guideUnitV.multScalar(distance));
      let modelPt2 = (new Vec3(cube[cornerIndexes[3]])).add(guideUnitV.multScalar(distance));
      let endpoint1 = this.projectWorldToView(modelPt1.toArray(), width, height);
      let endpoint2 = this.projectWorldToView(modelPt2.toArray(), width, height);
      if (endpoint1[2] <= 0 || endpoint2[2] <= 0) {
        let actualStart = endpoint1;
        let actualEnd = endpoint2;
        if (actualStart[2] > 0) {
          actualStart = this.intersectLineWithViewPlane(actualStart, actualEnd);
        }
        if (actualEnd[2] > 0) {
          actualEnd = this.intersectLineWithViewPlane(actualStart, actualEnd);
        }
        ret.push([actualStart[0], actualStart[1], actualEnd[0], actualEnd[1]]);
      }
      distance += spacing;
    }
    return ret;
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

  preloadImage(srcPath, onLoad) {
    let img = document.createElement("img");
    img.src = srcPath;
    img.onload = onLoad;
    return img;
  }

  projectWorldToView(pt, viewWidth, viewHeight) {
    let ptV = [pt[0], pt[1], pt[2], 1];
    let projV = this.opM.multVec4(ptV);
    let halfWidth = viewWidth / 2;
    let halfHeight = viewHeight / 2;
    return [projV.x * halfWidth + halfWidth, projV.y * halfHeight + halfHeight, projV.z];
  }

  intersectLineWithViewPlane(point1, point2) {
    return this.intersectLineWithPlane(point1, point2, [0,0,0], [0,0,1]);
  }

  intersectLineWithPlane(point1, point2, planePoint, planeNormal) {
    const epsilon = 0.000001;
    point1 = new Vec3(point1);
    point2 = new Vec3(point2);
    planePoint = new Vec3(planePoint);
    planeNormal = new Vec3(planeNormal);
    let u = point2.sub(point1);
    let dot = planeNormal.dot(u);
    if (Math.abs(dot) > epsilon) {
      let w = point1.sub(planePoint);
      let fac = -1*planeNormal.dot(w) / dot;
      u = u.multScalar(fac);
      return point1.add(u).toArray();
    } else {
      return null;
    }
  }
  
  generateOrthographicProjectionMatrix() {
    return new Mat44([
      // col 1
      2.0 / (frustrum.right - frustrum.left), 0, 0, 0,
      // col 2
      0, 2.0 / (frustrum.top - frustrum.bottom), 0, 0,
      // col 3
      0, 0, -2 / (frustrum.far - frustrum.near), 0,
      // col 4
      -1 * (frustrum.right + frustrum.left) / (frustrum.right - frustrum.left),
      -1 * (frustrum.top + frustrum.bottom) / (frustrum.top - frustrum.bottom),
      -1 * (frustrum.far + frustrum.near) / (frustrum.far - frustrum.near),
      1
    ]);
  }
}

function mapStateToProps(state) {
  return {
    mouthOpen: state.talkingHead.mouthOpen,
    isSpeaking: state.talkingHead.isSpeaking,
    phi: state.talkingHead.phi,
    theta: state.talkingHead.theta,
    psi: state.talkingHead.psi,
    responseText: state.response.responseText,
  };
}

export default TalkingHead = compose(
  SizeMe(),
  connect(mapStateToProps),
)(TalkingHead);

// these consts and functions are related to the moving "cube" background
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

const cubeSides = [
  [0, 3, 7, 4],
  [1, 2, 6, 5],
  [0, 1, 5, 4],
  [3, 2, 6, 7],
  [0, 1, 2, 3],
  [4, 5, 6, 7]
];

const cubeSideColors = [ "blue", "red", "yellow", "orange", "green", "purple" ];

function getRotatedCube(phi, theta, psi) {
  let sin = [Math.sin(phi), Math.sin(theta), Math.sin(psi)];
  let cos = [Math.cos(phi), Math.cos(theta), Math.cos(psi)];
  let rotM = new Mat33([
    // col 1
    cos[1], cos[0] * sin[1], sin[0] * sin[1],
    // col 2
    -1 * cos[2] * sin[1], cos[0] * cos[1] * cos[2] - sin[0] * sin[2], cos[0] * sin[2] + cos[1] * cos[2] * sin[0],
    // col 3
    sin[1] * sin[2], -1 * cos[2] * sin[0] - cos[0] * cos[1] * sin[2], cos[0] * cos[2] - cos[1] * sin[0] * sin[2]
  ]);
  return [
    rotM.multVec3(cube[0]).toArray(),
    rotM.multVec3(cube[1]).toArray(),
    rotM.multVec3(cube[2]).toArray(),
    rotM.multVec3(cube[3]).toArray(),
    rotM.multVec3(cube[4]).toArray(),
    rotM.multVec3(cube[5]).toArray(),
    rotM.multVec3(cube[6]).toArray(),
    rotM.multVec3(cube[7]).toArray(),
  ];
}

const frustrum = {
  left: -300,
  right: 300,
  bottom: -300,
  top: 300,
  near: -300,
  far: 300
};

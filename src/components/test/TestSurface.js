import React from "react";
import { connect } from "react-redux";
import { Row, Col, Panel } from "react-bootstrap";
// import { Rect } from "react-retina";
import { Layer, Rect, Line, Stage, Group, Image } from 'react-konva';
import { Mat44, Mat33, Vec4, Vec3 } from "alfador";
import ReactBootstrapSlider from "react-bootstrap-slider";

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
  left: -400,
  right: 400,
  bottom: -400,
  top: 400,
  near: -600,
  far: 600
};

export class TestSurface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closedFrame: null,
      closedFrameLoaded: false,
      openFrame: null,
      openFrameLoaded: false,
      phiSliderVal: 45,
      thetaSliderVal: 45,
      psiSliderVal: 45,
    };
    this.opM = this.generateOrthographicProjectionMatrix();
  }

  componentDidMount() {
    console.log("Preloading frame images");
    // the closed frame
    var img1 = document.createElement("img");
    img1.src = "/media/jerome-closed-trans.png";
    img1.onload = () => {
      console.log("image1 onload called");
      this.setState({ closedFrameLoaded: true });
    };
    // the open frame
    var img2 = document.createElement("img");
    img2.src = "/media/jerome-open-trans.png";
    img2.onload = () => {
      console.log("image2 onload called");
      this.setState({ openFrameLoaded: true });
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
      <div>
        <Stage width={width} height={height}>
          <Layer>
            {this.renderBackground(width, height)}
            {/* {this.renderLines(width, height)} */}
            {this.renderCube(width, height)}
            {/* {this.renderFrame(width, height)} */}
          </Layer>
        </Stage>
        <Panel>
          <Col xs={4}>
            <p>Phi: { this.state.phiSliderVal }</p>
            <ReactBootstrapSlider
              value={this.state.phiSliderVal}
              change={(e) => {
                this.setState({ phiSliderVal: e.target.value });
              }}
              max={180}
              min={-180}
            />
          </Col>
          <Col xs={4}>
            <p>Theta: { this.state.thetaSliderVal }</p>
            <ReactBootstrapSlider
              value={this.state.thetaSliderVal}
              change={(e) => {
                this.setState({ thetaSliderVal: e.target.value });
              }}
              max={180}
              min={-180}
            />
          </Col>
          <Col xs={4}>
            <p>Psi: { this.state.psiSliderVal }</p>
            <ReactBootstrapSlider
              value={this.state.psiSliderVal}
              change={(e) => {
                this.setState({ psiSliderVal: e.target.value });
              }}
              max={180}
              min={-180}
            />
          </Col>
        </Panel>
      </div>
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

  renderCube(width, height, phi, theta, psi) {
    
    let cube = getRotatedCube(
      (this.state.phiSliderVal/180)*Math.PI,
      (this.state.thetaSliderVal/180)*Math.PI,
      (this.state.psiSliderVal/180)*Math.PI
    );
    let ret = [];
    // for (let i = 0; i < 8; i++) {
    //   for (let j = i + 1; j < 8; j++) {
    //     let endpoint1 = this.projectWorldToView(cube[i], width, height);
    //     let endpoint2 = this.projectWorldToView(cube[j], width, height);
    //     lines.push([endpoint1[0], endpoint1[1], endpoint2[0], endpoint2[1]]);
    //   }
    // }
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
        <Image x={0} y={0} width={width} height={height} image={this.state.closedFrame} />
      );
    }
  }

  generateLines(width, height, numdivs) {
    let testPt = [500, 500, 500];
    let pVecScaledShifted = new Vec4(this.projectWorldToView(testPt, width, height));
    console.log(pVecScaledShifted.toString());

    let ret = [];
    let spacing = height / numdivs;
    let offset = spacing / 2;
    for (let i = 0; i < numdivs; i++) {
      let y = offset + i * spacing;
      ret.push([0, y, width - 1, y])
    }
    return ret;
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

  project3DPointToPlane(point, planePoint, planeNormal) {
    let t = (planeNormal[0] * planePoint[0] - planeNormal[0] * point[0]
      + planeNormal[1] * planePoint[1] - planeNormal[1] * point[1]
      + planeNormal[2] * planePoint[2] - planeNormal[2] * point[2])
      / (planeNormal[0] * planeNormal[0] + planeNormal[1] * planeNormal[1] + planeNormal[2] * planeNormal[2]);
    return [
      point[0] + t * planeNormal[0],
      point[1] + t * planeNormal[1],
      point[2] + t * planeNormal[2],
    ];
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

export default TestSurface = connect()(TestSurface);

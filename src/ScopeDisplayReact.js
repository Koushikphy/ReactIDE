import React from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';

const fs = require("fs");

function generateData(n) {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push(Math.random());
  }
  return data;
};



function parseData(strDps) {
  var newdat = [],
      blocks = [];
  strDps = strDps.trim().split(/\r?\n\s*\r?\n/);
  try{
      for (let i of strDps) {
          blocks = i.trim().split("\n");
          for (var j = 0; j < blocks.length; j++) {
              blocks[j] = blocks[j].trim().split(/[\s\t]+/);
              blocks[j] = blocks[j].map(x => {
                  let y = parseFloat(x)
                  if(isNaN(y)){
                      throw "badData"
                  } else{
                      return y
                  }
              });
          };
          newdat.push(transpose(blocks));
      }
  } catch(err){
      if(err='badData'){
          alert("Bad data found !!!\nCheck the file before openning.")
      }
      return
  }
  return newdat;
};

function transpose(m) {
  return m[0].map((_, i) => m.map(x => x[i]));
};


function clamp(x, lower, upper) {
  return Math.max(lower, Math.min(x, upper));
};


function startDragBehavior(a,b) {
  console.log(a)
  console.log(b)
//   var d3 = Plotly.d3;
//   var drag = d3.behavior.drag();
//   var oldDatX, oldDatY, pIndex;

//   drag.origin(function () {
//       // saveOldData();
//       let [x,y] = this.getAttribute('transform').slice(10,-1).split(/,| /);
//       pIndex = this.index
//       // if (index.length) {oldDatX = clone(dpsx); oldDatY = clone(dpsy);}
//       return {x,y}
//   })

//   drag.on("drag", function () {
//       let yaxis = figurecontainer._fullLayout.yaxis;
//       let xaxis = figurecontainer._fullLayout.xaxis;

      // let yVal = yaxis.p2l(d3.event.y)
//       dpsy[pIndex] = yVal //dpsy is a reference to data, so this also modifies the data
//       for (let i of index) dpsy[i] = yVal - oldDatY[pIndex] + oldDatY[i]
//           Plotly.restyle(figurecontainer, {y: [dpsy]}, currentEditable)

//   });
//   drag.on("dragend", updateOnServer)
//   d3.selectAll(`.scatterlayer .trace:nth-of-type(1) .points path`).call(drag);
};



class ScopeDisplayReact extends React.Component {
  constructor(props) {
    super(props);


    const data = [{
        y: generateData(props.numPointsToPlotEachTick),
        line: { color: 'red' },
        type: 'scatter',
        opacity: 1,
        mode: 'markers+lines',
      }];

      this.myRef = React.createRef();
      this.state = {

      data,
      layout: {
        width: 1000,
        height: 700,
      },
      frames: [],
      config: {},
      revision: 0,
      sliceNum: 1,
    };

    this.tick = this.tick.bind(this);
  }


  tick() {
    console.log(Plotly.d3.range(1,2,.1))
    const [a,b]= parseData(fs.readFileSync('data.txt', "utf8"))[0]
    const data = [{
      "x" : a,
      "y": b,
      line: { color: 'red' },
      type: 'scatter',
      opacity: 1,
      mode: 'markers+lines',
    }];

    console.log(data)

    this.setState(oldState => {
      return {
        revision: oldState.revision + 1,
        data,
        layout: {
          ...oldState.layout,
          height: 700,
        },
      };
    });
    console.log(this.state.data)
  }


  // componentDidMount() {
  //  console.log('mount')
  // }

  // componentWillUnmount() {
  //   console.log('unmount')
  // }

  componentDidUpdate(prevProps) {
    if(prevProps.numPointsToPlotEachTick != this.props.numPointsToPlotEachTick) this.tick()
    console.log('updated=>',this.props.numPointsToPlotEachTick,prevProps.numPointsToPlotEachTick)
    console.log(this.myRef)
    // this.points = this.myRef.querySelector(".scatterlayer .trace:first-of-type .points").getElementsByTagName("path");
    startDragBehavior(this.myRef, this.figure)
  }


  render() {
    return (
      <Plot
        ref={this.myRef}
        data={this.state.data}
        layout={this.state.layout}
        revision={this.state.revision}
        onUpdate={console.log}
        onInitialized={figure => this.setState(figure)}
      />
    );
  }
}

export default ScopeDisplayReact;

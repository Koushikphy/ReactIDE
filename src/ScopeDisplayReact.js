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

// function startDragBehavior() {
//   var d3 = Plotly.d3;
//   var drag = d3.behavior.drag();
//   drag.origin(function () {
//       var transform = d3.select(this).attr("transform");
//       var translate = transform.substring(10, transform.length - 1).split(/,| /);
//       return {
//           x: translate[0],
//           y: translate[1]
//       };
//   });
//   drag.on("drag", function () {
//       var xmouse = d3.event.x,
//           ymouse = d3.event.y;
//       d3.select(this).attr("transform", "translate(" + [xmouse, ymouse] + ")");
//       var handle = this.handle;
//       var yaxis = figurecontainer._fullLayout.yaxis;
//       handle.y = clamp(yaxis.p2l(ymouse), yaxis.range[0], yaxis.range[1]);

//       updateFigure();
//   });
//   drag.on("dragend", function () {
//       updateFigure();
//       d3.select(".scatterlayer .trace:first-of-type .points path:first-of-type").call(drag);
//   });
//   d3.selectAll(".scatterlayer .trace:first-of-type .points path").call(drag);
// };



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


  componentDidMount() {
   console.log('mount')
  }

  componentWillUnmount() {
    console.log('unmount')
  }

  componentDidUpdate(prevProps) {
    if(prevProps.numPointsToPlotEachTick != this.props.numPointsToPlotEachTick) this.tick()
    console.log('updated=>',this.props.numPointsToPlotEachTick,prevProps.numPointsToPlotEachTick)
    console.log(this.myRef)
  }


  render() {
    return (
      <Plot
        ref={this.myRef} 
        data={this.state.data}
        layout={this.state.layout}
        revision={this.state.revision}
        onInitialized={figure => this.setState(figure)}
      />
    );
  }
}

export default ScopeDisplayReact;

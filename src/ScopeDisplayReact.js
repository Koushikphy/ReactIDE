import React from 'react';
import Plot from 'react-plotly.js';

const fs = require('fs')

var ss = fs.readFileSync('package.json', "utf8")
console.log(ss)


function generateData(n) {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push(Math.random());
  }
  return data;
};



class ScopeDisplayReact extends React.Component {
  constructor(props) {
    super(props);


    const data = [{
        y: generateData(props.numPointsToPlotEachTick),
        line: { color: 'red' },
      }];

    this.state = {

      data,
      layout: {
        width: 1000,
        height: 700,
        title: 'Scope Display React',
      },
      frames: [],
      config: {},
      revision: 0,
      sliceNum: 1,
    };

  }

  componentDidMount() {
   console.log('mount')
  }

  componentWillUnmount() {
    console.log('unmount')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('updated')
  }


  render() {
    return (
      <Plot
        data={this.state.data}
        layout={this.state.layout}
        revision={this.state.revision}
        onInitialized={figure => this.setState(figure)}
      />
    );
  }
}

export default ScopeDisplayReact;

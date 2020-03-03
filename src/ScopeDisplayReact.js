import React from 'react';
import Plot from 'react-plotly.js';


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
        type: 'scatter',
        opacity: 1,
        mode: 'markers+lines',
      }];

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
    const { numPlots, numPointsToPlotEachTick } = this.props;


    const data = [{
      y: generateData(numPointsToPlotEachTick),
      line: { color: 'red' },
      type: 'scatter',
      opacity: 1,
      mode: 'markers+lines',
    }];


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
  }


  componentDidMount() {
   console.log('mount')
  }

  componentWillUnmount() {
    console.log('unmount')
  }

  componentDidUpdate(prevProps) {
    if(prevProps.numPointsToPlotEachTick != this.props.numPointsToPlotEachTick) this.tick()
    // console.log('updated=>',this.props.numPointsToPlotEachTick)
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

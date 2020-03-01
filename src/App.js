import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ScopeDisplay from './ScopeDisplay';
import ScopeDisplayReact from './ScopeDisplayReact';
import './App.css';



function generateData(n) {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push(Math.random());
  }
  return data;
};


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const App = ({ classes }) => {

  const [numPlots, setNumPlots] = useState(1);
  const [numPlotsText, setNumPlotsText] = useState(1);

  const [numPointsPerPlot, setNumPointsPerPlot] = useState(100);
  const [numPointsPerPlotText, setNumPointsPerPlotText] = useState(100);

  const [updateSpeed, setUpdateSpeed] = useState(1000);
  const [updateSpeedText, setUpdateSpeedText] = useState(1000);

  return (
    <div className="App">
      <AppBar position="fixed" color="default">
        <Toolbar>
          hvhvy
          <Button
            variant={'contained'}
            color="primary"
            className={classes.button}
            onClick={() => {
              setNumPlots(numPlotsText);
              setNumPointsPerPlot(numPointsPerPlotText);
              setUpdateSpeed(updateSpeedText);
            }}
            >
            Update plots
          </Button>
        </Toolbar>
      </AppBar>


      <div style={{ marginTop: 75 }}>

          <ScopeDisplayReact
            numPointsToPlotEachTick={numPointsPerPlot}
          />

          {/* <ScopeDisplay
            numPlots={numPlots}
            updateSpeed={updateSpeed}
            numPointsToPlotEachTick={numPointsPerPlot}
          /> */}

      </div>
    </div>
  );
};

export default withStyles(styles)(App);

import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ScopeDisplay from './ScopeDisplay';
import ScopeDisplayReact from './ScopeDisplayReact';
import './App.css';







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

  const [numPointsPerPlot, setNumPointsPerPlot] = useState(100);

  return (
    <div className="App">
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Button
            variant={'contained'}
            color="primary"
            className={classes.button}
            onClick={() => {
              setNumPointsPerPlot(numPointsPerPlot+1);
              // console.log(numPointsPerPlot)
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

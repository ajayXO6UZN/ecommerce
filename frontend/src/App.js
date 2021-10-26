import './App.css';
import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Layout from './components/Layout/Layout';
import Test from './container/Test/Test';
import { getAllCategory } from './actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({

}));

function App() {
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  return (
    <Router>
      <Switch>
    
        <Route exact path="/" component={Sidebar} />

        <Route  path="/nav" component={Navbar} />
        <Route  path="/layout" component={Layout} />
        <Route  path="/test" component={Test} />

    
      </Switch>

    </Router>


  );
}

export default App;

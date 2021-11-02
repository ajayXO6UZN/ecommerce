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
import Product from './container/Product/Product';
import Users from './container/Users/Users';
import { getAllProduct } from './actions/productAction';
import SignInOutContainer from './container/SignInOutContainer/SignInOutContainer';


const useStyles = makeStyles((theme) => ({

}));

function App() {
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllProduct());
  }, []);

  return (
    <Router>
      <Switch>
    
        <Route exact path="/" component={Sidebar} />

        <Route  path="/nav" component={Navbar} />
        <Route  path="/layout" component={Layout} />
        <Route  path="/test" component={Test} />
        <Route  path="/product" component={Product} />
        <Route  path="/user" component={Users} />
        <Route  path="/signup" component={SignInOutContainer} />

    
      </Switch>

    </Router>


  );
}

export default App;

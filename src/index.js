import React from 'react';
import { render } from 'react-dom';
import Login from "./components/Login";
import Registration from "./components/Registration";
import Catalog from "./components/Catalog";
import SubCategory from "./components/SubCategory";
import Product from "./components/Product";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

render (
    <Router>
        <div>
            <Route exact path="/" component={Login}/>
            <Route path="/registration" component={Registration}/>
            <Route path="/catalog" component={Catalog}/>
            <Route path="/sub-category/:id" component={SubCategory}/>
            <Route path="/product/:id" component={Product}/>
        </div>
    </Router>,
    document.getElementById('root')
);
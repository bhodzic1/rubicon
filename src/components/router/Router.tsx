import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../../App';

import CardDetails from '../cardDetails/CardDetails';
import MovieDetails from '../details/MovieDetails';


const Router = () => {
    return (
    <BrowserRouter>
    <Switch>
      <Route path="/" component={ App } exact />
      <Route path="/:type/details/:id" component={ MovieDetails } />
    </Switch>
    </BrowserRouter>
    )
}

export default Router;
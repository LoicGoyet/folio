import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './pages/home';
import About from './pages/about';

export default props => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
    </div>
  </Router>
);

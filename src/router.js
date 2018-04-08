import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import ProjectAlpha from './pages/ProjectAlpha';

export default props => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/alpha" component={ProjectAlpha} />
    </div>
  </Router>
);
